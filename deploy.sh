#!/bin/bash

# Función para obtener el timestamp actual
get_timestamp() {
    date "+%Y-%m-%d %H:%M:%S"
}

# Función para calcular la diferencia de tiempo en segundos
time_diff() {
    start=$1
    end=$2
    echo $(( $(date -d "$end" +%s) - $(date -d "$start" +%s) ))
}

# Función para verificar la salud del contenedor
check_health() {
    local container=$1
    local max_retries=30
    local retry_interval=5

    for i in $(seq 1 $max_retries); do
        if docker run --rm --network container:$container alpine wget -q -O - http://localhost:3000 > /dev/null 2>&1; then
            echo "$container está saludable"
            return 0
        fi
        echo "Intento $i: $container aún no está listo. Reintentando en $retry_interval segundos..."
        sleep $retry_interval
    done

    echo "$container no está saludable después de $max_retries intentos"
    return 1
}

# Registrar el tiempo de inicio
start_time=$(get_timestamp)
echo "Script iniciado en: $start_time"

# Determinar el entorno activo actual
if grep -q "server frontend-blue:3000;" nginx.conf; then
    current_env="blue"
    new_env="green"
else
    current_env="green"
    new_env="blue"
fi

echo "Entorno actual: $current_env. Desplegando en: $new_env"

# Construir e iniciar el nuevo entorno
docker-compose up -d --build frontend-$new_env

# Verificar la salud del nuevo contenedor
if ! check_health "frontend-$new_env"; then
    echo "El nuevo contenedor no está saludable. Realizando diagnóstico..."
    
    echo "Logs del contenedor:"
    docker-compose logs "frontend-$new_env"
    
    echo "Estado del contenedor:"
    docker inspect "frontend-$new_env"
    
    echo "Procesos en ejecución dentro del contenedor:"
    docker-compose exec "frontend-$new_env" ps aux
    
    echo "Verificando si el puerto 3000 está en uso:"
    docker-compose exec "frontend-$new_env" netstat -tuln | grep 3000
    
    echo "Abortando el despliegue."
    exit 1
fi

# Registrar el tiempo justo antes del reload de Nginx
pre_reload_time=$(get_timestamp)

# Actualizar la configuración de Nginx
sed -i "s/server frontend-$current_env:3000;/server frontend-$new_env:3000;/" nginx.conf

# Recargar la configuración de Nginx
docker-compose exec nginx nginx -s reload

# Registrar el tiempo justo después del reload de Nginx
post_reload_time=$(get_timestamp)

# Calcular el tiempo de inactividad
downtime=$(time_diff "$pre_reload_time" "$post_reload_time")

echo "Despliegue completado. El tráfico ahora se dirige al entorno $new_env"
echo "Tiempo de inactividad durante el reload de Nginx: $downtime segundos"

# Esperar 30 segundos antes de detener el entorno antiguo
echo "Esperando 30 segundos antes de detener el entorno antiguo..."
sleep 30

# Detener el entorno antiguo
echo "Deteniendo el entorno antiguo ($current_env)..."
docker-compose stop frontend-$current_env
echo "Entorno antiguo ($current_env) detenido."

# Verificar el estado de todos los servicios
echo "Verificando el estado de todos los servicios..."
docker-compose ps

# Realizar limpieza de recursos no utilizados
echo "Realizando limpieza de recursos Docker no utilizados..."
docker system prune -af --volumes

# Registrar el tiempo de finalización
end_time=$(get_timestamp)
echo "Script finalizado en: $end_time"

# Calcular el tiempo total de ejecución
total_time=$(time_diff "$start_time" "$end_time")
echo "Tiempo total de ejecución del script: $total_time segundos"

# Mostrar uso de disco actual
echo "Uso de disco actual:"
df -h
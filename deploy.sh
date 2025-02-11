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

# Función para verificar la salud del contenedor usando el healthcheck de Docker
check_health() {
    local service=$1
    local max_retries=30
    local retry_interval=5

    # Obtener el ID del contenedor usando docker-compose ps
    container_id=$(docker-compose ps -q "$service")
    if [ -z "$container_id" ]; then
        echo "No se encontró el contenedor para el servicio $service."
        return 1
    fi

    for i in $(seq 1 $max_retries); do
        # Consultar el estado de salud definido en Docker
        health_status=$(docker inspect --format='{{.State.Health.Status}}' "$container_id" 2>/dev/null)
        if [ "$health_status" == "healthy" ]; then
            echo "El servicio $service está saludable."
            return 0
        fi
        echo "Intento $i: Estado actual de salud de $service: $health_status. Reintentando en $retry_interval segundos..."
        sleep $retry_interval
    done

    echo "El servicio $service no alcanzó estado saludable después de $max_retries intentos."
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
docker-compose up -d --build "frontend-$new_env"

# Verificar la salud del nuevo contenedor usando el healthcheck de Docker
if ! check_health "frontend-$new_env"; then
    echo "El nuevo contenedor no está saludable. Abortando el despliegue."
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
docker-compose stop "frontend-$current_env"
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

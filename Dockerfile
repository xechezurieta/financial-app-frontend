# Etapa de construcción
FROM node:20-alpine AS builder

# Instalar pnpm
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml* ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación
RUN pnpm run build

# Etapa de producción
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Crear un usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Establecer los permisos correctos
RUN chown -R nextjs:nodejs /app

# Cambiar al usuario no-root
USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]


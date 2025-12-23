FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema necesarias para MySQL
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    mysql-client

# Crear estructura de directorios
RUN mkdir -p /app/backend /app/frontend

# Copiar archivos del backend
COPY backend/package*.json /app/backend/
COPY backend/ /app/backend/

# Copiar archivos del frontend
COPY frontend/ /app/frontend/

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm install

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

CMD ["node", "server.js"]
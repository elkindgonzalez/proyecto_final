# Etapa 1: Imagen base con Node
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero (mejor caché)
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY . .

# Variables de entorno
ENV PORT=8080

# Exponer el puerto
EXPOSE 8080

# Comando para arrancar la app
CMD ["npm", "start"]

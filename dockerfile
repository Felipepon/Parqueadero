# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY src/ .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 5000

# Define el comando por defecto para ejecutar la aplicación
CMD ["node", "app.js"]

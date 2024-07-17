# Parqueadero API

Esta es una API Rest creada con Express para gestionar el registro de placas y tiempos de un parqueadero que solo acepta motos y carros.

## Requisitos

- Node.js
- MongoDB
- Postman (opcional)

## Instalación

1. Clonar el repositorio:
   ```sh
   git clone git@github.com:Felipepon/Parqueadero.git
   cd Parqueadero/src

2. Instalar dependencias:
    ```sh
    npm install

## Ejecución

Para iniciar el servidor:
    ```sh
    node app.js

## Backup de Base de Datos

    El backup de la base de datos se encuentra en el directorio ~/backup.
    Para restaurar la base de datos:
        ```sh
        mongodump --uri "mongodb+srv://felipontamayo:2STmH1iEjaHAA1JG@cluster0.i0er2rw.mongodb.net/test?retryWrites=true&w=majority" --out ~/backup/mongodb

## Colección de Postman

La colección de Postman se encuentra en el archivo REST API basics: CRUD, test & variable.json.

Importa esta colección en Postman para probar las diferentes operaciones del API.





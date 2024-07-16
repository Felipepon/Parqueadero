const express = require('express');
const connectDB = require('./config/db');
const vehicleRoutes = require('./routes/vehicle');
const bodyParser = require('body-parser');
require('dotenv').config(); // Cargar variables de entorno desde .env

const app = express();

// Conectar a la base de datos
connectDB();

app.use(bodyParser.json());

app.use('/api/vehicles', vehicleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

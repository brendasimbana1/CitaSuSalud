const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;


const corsOptions = {
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/citaSuSalud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a MongoDB exitosa.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  idUsuario: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: Number, required: true },
});

module.exports = mongoose.model("User", userSchema);

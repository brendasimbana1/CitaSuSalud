const mongoose = require("mongoose");
const mongooseSequence = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  idUsuario: { type: Number, unique: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: Number, required: true }
});

userSchema.plugin(mongooseSequence, { inc_field: 'idUsuario' });

module.exports = mongoose.model("User", userSchema);
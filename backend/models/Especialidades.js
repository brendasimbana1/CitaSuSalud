const mongoose = require('mongoose');

const EspecialidadesSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  doctor: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  fechaIngreso: {
    type: Date,
    required: true,
  },
});

const Especialidades = mongoose.model('Especialidades', EspecialidadesSchema);

module.exports = Especialidades;

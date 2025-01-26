const mongoose = require('mongoose');

const HorarioSchema = new mongoose.Schema({
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Especialidad', // Relación con el modelo Especialidad
    required: true 
  },
  doctor: { 
    type: String, 
    required: true 
  },
  especialidad: { 
    type: String, 
    required: true 
  },
  horario: [
    {
    fecha: { 
        type: Date, 
        required: true 
    },
      inicio: { 
        type: String, 
        required: true 
      },
      fin: { 
        type: String, 
        required: true 
      },
    }
  ],
});

module.exports = mongoose.model('Horario', HorarioSchema);

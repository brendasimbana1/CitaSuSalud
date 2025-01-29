const mongoose = require("mongoose");

const CitaSchema = new mongoose.Schema({
  pacienteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Especialidad",
    required: true 
  },
  especialidad: { 
    type: String, 
    required: true 
  },
  fecha: { 
    type: Date, 
    required: true 
  },
  hora: { 
    type: String, // Formato HH:mm
    required: true 
  },
  motivo: { 
    type: String, 
    required: true,
    trim: true 
  }
});

module.exports = mongoose.model("Cita", CitaSchema);

const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const User = require("../models/User");
const Especialidad = require('../models/Especialidades'); 
const Horario = require('../models/Horarios');
const Cita = require("../models/Citas");

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { nombre, correo, password, rol } = req.body;  
  if (!nombre || !correo || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {

    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nombre,
      correo,
      password: hashedPassword,
      rol,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
    console.error("Error en el servidor:", error); 
    res.status(500).json({ message: "Error en el servidor.", error });
  }
});


// Login de usuario
router.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  try {
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }
    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      usuario: {
        _id: user._id,
        idUsuario: user.idUsuario,
        nombre: user.nombre,
        rol: user.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor.", error });
  }
});

router.post('/register-especialidad', async (req, res) => {
  try {
    const { nombre, doctor, fechaIngreso } = req.body;

    if (!nombre || !doctor || !fechaIngreso) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const existingUser = await Especialidad.findOne({ doctor });
    if (existingUser) {
      return res.status(400).json({ message: "El nombre ya está registrado." });
    }

    const nuevaEspecialidad = new Especialidad({
      nombre,
      doctor,
      fechaIngreso: new Date(fechaIngreso), // Convertir a objeto Date
    });

    const especialidadGuardada = await nuevaEspecialidad.save();

    res.status(201).json({ message: 'Especialidad registrada con éxito', data: especialidadGuardada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar la especialidad' });
  }
});

router.post('/register-horario', async (req, res) => {
  const { especialidad, doctor, horario} = req.body;
  try {
    const especialidadData = await Especialidad.findOne({ nombre: especialidad, doctor: doctor });
    
    if (!especialidadData) {
      return res.status(400).json({ message: 'Especialidad o Doctor no encontrado' });
    }

    const doctorId = especialidadData._id; 

    const nuevoHorario = new Horario({
      doctorId,  
      doctor,  
      especialidad,
      horario,
    });

    await nuevoHorario.save();
    res.status(201).json({ message: 'Horario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar horario:', error);
    res.status(500).json({ message: 'Error al registrar el horario' });
  }
});


router.get('/get-especialidades', async (req, res) => {
  try {
    const especialidades = await Especialidad.find();
    
    if (especialidades.length === 0) {
      return res.status(404).json({ message: 'No hay especialidades registradas' });
    }

    res.status(200).json(especialidades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las especialidades', error });
  }
});

router.get('/get-doctores/:especialidad', async (req, res) => {
  const { especialidad } = req.params;

  try {
    const especialidades = await Especialidad.find({ nombre: especialidad });

    if (especialidades.length === 0) {
      return res.status(404).json({ message: 'No se encontraron doctores para esta especialidad' });
    }

    const doctores = especialidades.map((especialidad) => especialidad.doctor);

    res.status(200).json(doctores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los doctores', error });
  }
});

//CITAS

const generarHorarios = (inicio, fin) => {
  let horarios = [];
  let horaActual = new Date(`2000-01-01T${inicio}:00`);
  let horaFin = new Date(`2000-01-01T${fin}:00`);

  while (horaActual < horaFin) {
    let siguienteHora = new Date(horaActual.getTime() + 40 * 60000);
    if (siguienteHora > horaFin) break;
    horarios.push(horaActual.toTimeString().substring(0, 5));
    horaActual = siguienteHora;
  }
  if (horarios.length === 0) {
    return res.status(404).json({ message: "No hay horarios disponibles para este doctor en la fecha seleccionada." });
  }

  return horarios;
};

router.get("/horarios-disponibles", async (req, res) => {
  try {
    const { doctorId, fecha } = req.query;
    if (!doctorId || !fecha) {
      return res.status(400).json({ error: "Doctor y fecha son requeridos" });
    }

    const especialidadData = await Especialidad.findOne({doctor: doctorId});
    if (!especialidadData) {
      return res.status(400).json({ message: 'Doctor no encontrado' });
    }

    const id = especialidadData._id.toString();

    const fechaISO = new Date(fecha).toISOString().split("T")[0];

    const horario = await Horario.findOne({ doctorId: id, "horario.fecha": new Date(fechaISO) });

    if (!horario) return res.status(404).json({ error: "No hay horario disponible para esta fecha" });

    const horarioDia = horario.horario.find(h => h.fecha.toISOString().split("T")[0] === fechaISO);
    if (!horarioDia) return res.status(404).json({ error: "No hay horario en esa fecha" });

    let horariosDisponibles = generarHorarios(horarioDia.inicio, horarioDia.fin);

    const citasOcupadas = await Cita.find({ doctorId: id, fecha: new Date(fechaISO) }).select("hora");
    const horariosOcupados = citasOcupadas.map(cita => cita.hora);

    horariosDisponibles = horariosDisponibles.filter(hora => !horariosOcupados.includes(hora));

    res.json(horariosDisponibles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener horarios disponibles" });
  }
});

router.post('/register-cita', async (req, res) => {
  const { pacienteId, doctorId, especialidad, fecha, hora, motivo } = req.body;
  try {
    if (!pacienteId || !doctorId || !especialidad || !fecha || !hora || !motivo) {
      return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }
    const especialidadData = await Especialidad.findOne({doctor: doctorId});
    if (!especialidadData) {
      return res.status(400).json({ message: 'Doctor no encontrado' });
    }

    id = especialidadData._id.toString();

    const existingAppointment = await Cita.findOne({ 
      doctorId: id, 
      fecha, 
      hora 
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Este horario ya está ocupado.' });
    }

    const newCita = new Cita({
      pacienteId,
      doctorId: id,
      especialidad,
      fecha,
      hora,
      motivo,
    });

    await newCita.save();

    return res.status(201).json({ message: 'Cita registrada exitosamente.' });
  } catch (error) {
    console.error("Error al registrar la cita:", error);
    return res.status(500).json({ message: 'Error en el servidor. Intenta nuevamente más tarde.' });
  }
});

router.get('/citas/:usuarioId', async (req, res) => {
  try {
    let pacienteId = req.params.usuarioId;
    pacienteId = pacienteId.replace(":", "");
    const pacienteObjectId = new mongoose.Types.ObjectId(pacienteId);
    const citas = await Cita.find({ pacienteId: pacienteObjectId });
    res.json(citas);
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    res.status(500).json({ message: "Error al obtener las citas" });
  }
});

router.delete('/citas/:citaId', async (req, res) => {
  try {
    const citaId = req.params.citaId;
    console.log("Cita ID recibido en el backend:", citaId);
    
    const result = await Cita.findByIdAndDelete(citaId);
    
    if (result) {
      res.json({ message: "Cita cancelada correctamente" });
    } else {
      res.status(404).json({ message: "Cita no encontrada" });
    }
  } catch (error) {
    console.error('Error al cancelar la cita:', error);
    res.status(500).json({ message: "Error al cancelar la cita" });
  }
});


module.exports = router;

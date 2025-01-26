const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Especialidad = require('../models/Especialidades'); 
const Horario = require('../models/Horarios');

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


module.exports = router;

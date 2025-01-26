const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { idUsuario, nombre, correo, password, rol } = req.body;

  try {
    // Verificar que el correo no esté registrado
    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      idUsuario,
      nombre,
      correo,
      password: hashedPassword,
      rol,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
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

module.exports = router;

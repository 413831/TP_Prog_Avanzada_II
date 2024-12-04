

const jwt = require('jsonwebtoken');

// Generar un token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { email, password,username,status,role, } = req.body;

    // Verificar si el usuario ya existe
    const User = require('../models/User')
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    const user = new User({ email, password, username,status,role });
    const response = await user.save();

    console.log(response)

    // Generar token
    const token = generateToken(user);

    res.status(201).json({ message: 'Usuario creado exitosamente', token });
  } catch (error) {
    
    console.log(error)
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const User = require('../models/User')
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Comparar contraseñas
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = generateToken(user);

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};

// Obtener perfil de usuario
exports.getProfile = async (req, res) => {
  try {
    const User = require('../models/User')
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
};

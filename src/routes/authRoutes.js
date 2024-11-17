const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../models');

const JWT_SECRET = 'secreto_super_seguro'; 

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({
      username,
      email,
      password: hashedPassword
    });

    res.json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        JWT_SECRET, 
        { expiresIn: '1h' } 
      );
  
      res.json({ message: 'Login exitoso', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
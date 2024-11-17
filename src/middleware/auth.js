const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secreto_super_seguro'; // Usa una variable de entorno en producción

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // El token suele venir en el formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    req.user = user; 
    next();
  });
};

module.exports = authenticateToken;

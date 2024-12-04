const express = require('express');

const router = express.Router();
const db = require('../models');

const JWT_SECRET = 'secreto_super_seguro'; 

const { register, login, getProfile } = require('../controller/authController');
const { protect } = require('../middleware/auth');

router.post('/signup', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

module.exports = router;
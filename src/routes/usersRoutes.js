const express = require('express');
const router = express.Router();
const db = require('../models');
const authenticateToken = require('../middleware/auth');


router.get('/users', authenticateToken ,async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

router.get('/users/:id', (req,res) => {
    
});

router.post('/users', (req,res) => {

});

router.put('/users/:id', (req, res) => {
    
});

router.delete('/users/:id', (req, res) => {
   
});

module.exports = router;
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

// Register
router.get('/auth/register', authCtrl.showRegister);
router.post('/auth/register', authCtrl.register);

// Login
router.get('/auth/login', authCtrl.showLogin);
router.post('/auth/login', authCtrl.login);

// Logout
router.post('/auth/logout', authCtrl.logout);

module.exports = router;

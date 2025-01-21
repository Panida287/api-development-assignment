const express = require('express');
const { signUp, login, refreshToken, logout } = require('./authController');
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.delete('/logout', logout);

module.exports = router;

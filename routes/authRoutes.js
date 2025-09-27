const express = require('express');
const { register, login, getMe, logout, updateProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/auth');
const authRouter = express.Router();

// public routes
authRouter.post('/register', register);
authRouter.post('/login', login);

// protected routes
authRouter.get('/getMe', isAuthenticated, getMe);
authRouter.post('/logout', isAuthenticated, logout);
authRouter.put('/profile', isAuthenticated, updateProfile);

module.exports = authRouter;
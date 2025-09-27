const express = require('express');
const { register, login, getMe, logout, updateProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const authRouter = express.Router();
const User = require('../models/User');

// public routes
authRouter.post('/register', register);
authRouter.post('/login', login);

// protected routes
authRouter.get('/getMe', isAuthenticated, getMe);
authRouter.post('/logout', isAuthenticated, logout);
authRouter.put('/profile', isAuthenticated, updateProfile);

// File upload routes
authRouter.post('/upload/profile-picture', isAuthenticated, upload.single('profilePicture'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const user = await User.findByIdAndUpdate(req.userId, { profilePicture: req.file.path }, { new: true }).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ message: 'Profile picture uploaded successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

authRouter.post('/upload/resume', isAuthenticated, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const user = await User.findByIdAndUpdate(req.userId, { resume: req.file.path }, { new: true }).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ message: 'Resume uploaded successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = authRouter;
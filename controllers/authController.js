const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../utils/config');
const sendEmail = require('../utils/email');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // save user to database
        const savedUser = await newUser.save();

        if (!savedUser) {
            return res.status(500).json({ message: 'Failed to register user' });
        }

        // send an welcome email to the user
        // await sendEmail(email, 'Welcome to Job Portal', `Hello ${name},\n\nWelcome to Job Portal! We're glad to have you on board.\n\nBest regards,\nJob Portal Team`);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User does not exists' });
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // set the token in the response header for httpOnly cookie
        res.cookie('token', token, {
            httpOnly: NODE_ENV === 'production',
            secure: NODE_ENV === 'production',
            sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture, resume: user.resume }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getMe = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select('-password').populate('assignedCompany', 'name');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            secure: NODE_ENV === 'production',
            sameSite: NODE_ENV === 'production' ? 'none' : 'lax'
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const updates = req.body;

        // do not allow updating email, password, role through this endpoint
        delete updates.email;
        delete updates.password;
        delete updates.role;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

}

module.exports = {
    register,
    login,
    getMe,
    logout,
    updateProfile
}
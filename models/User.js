const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'recruiter', 'user'], default: 'user' },
    profilePicture: { type: String, default: '' },
    phone: { type: String },
    resume: { type: String },
    bio: { type: String },
    skills: { type: [String], default: [] },
    experience: { type: Number, default: 0 }, // in years
    location: { type: String },
    assignedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');
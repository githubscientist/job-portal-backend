const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    salary: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: 'USD' },
    },
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
        default: 'Full-time',
    },
    experienceLevel: {
        type: String,
        enum: ['Entry', 'Junior', 'Mid', 'Senior', 'Lead', 'Executive'],
        default: 'Entry',
    },
    skills: [{ type: String }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applicationDeadline: { type: Date },
    isActive: { type: Boolean, default: true },
    applicationsCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema, 'jobs');
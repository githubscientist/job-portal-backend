const Company = require('../models/Company');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const createCompany = async (req, res) => {
    try {
        const { name, description, website, industry, location, size, foundedYear } = req.body;

        const newCompany = new Company({
            name,
            description,
            website,
            industry,
            location,
            size,
            foundedYear,
            createdBy: req.userId
        });

        const savedCompany = await newCompany.save();

        res.status(201).json({ message: 'Company created successfully', company: savedCompany });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().populate('createdBy', 'name email');
        res.status(200).json({ companies });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const company = await Company.findByIdAndUpdate(id, updates, { new: true });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json({ message: 'Company updated successfully', company });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        const company = await Company.findByIdAndDelete(id);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Remove any company assignment from recruiters
        await User.updateMany(
            { assignedCompany: id },
            { $unset: { assignedCompany: 1 } }
        );

        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// create Recruiter and assign to Company
const createRecruiter = async (req, res) => {
    try {
        const { name, email, password, companyId } = req.body;

        // check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // check if the company exists
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newRecruiter = new User({
            name,
            email,
            password: hashedPassword,
            role: 'recruiter',
            assignedCompany: companyId
        });

        const savedRecruiter = await newRecruiter.save();

        res.status(201).json({ message: 'Recruiter created successfully', recruiter: savedRecruiter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany,
    createRecruiter
};
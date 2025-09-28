const Job = require('../models/Job');
const Application = require('../models/Application');

const getAllJobs = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, location, jobType, experienceLevel } = req.query;

        const query = { isActive: true };

        // add search filters
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { skills: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        if (jobType) {
            query.jobType = jobType;
        }

        if (experienceLevel) {
            query.experienceLevel = experienceLevel;
        }

        const jobs = await Job.find(query)
            .populate('company', 'name logo location industry')
            .populate('postedBy', 'name')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Job.countDocuments(query);

        res.status(200).json({
            jobs,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id)
            .populate('company', 'name logo location industry description website')
            .populate('postedBy', 'name');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, skills, applicationDeadline } = req.body;

        const newJob = new Job({
            title,
            description,
            requirements: requirements || [],
            salary,
            location,
            jobType,
            experienceLevel,
            skills: skills || [],
            company: req.user.assignedCompany,
            postedBy: req.userId,
            applicationDeadline
        });

        const savedJob = await newJob.save();

        const populatedJob = await Job.findById(savedJob._id)
            .populate('company', 'name logo')
            .populate('postedBy', 'name');

        res.status(201).json({ message: 'Job created successfully', job: populatedJob });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const job = await Job.findByIdAndUpdate(id, updates, { new: true })
            .populate('company', 'name logo')
            .populate('postedBy', 'name');

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job updated successfully', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Delete all applications for this job
        await Application.deleteMany({ job: id });

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get jobs posted by the recruiter
const getRecruiterJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.userId })
            .populate('company', 'name logo')
            .sort({ createdAt: -1 });

        res.status(200).json({ jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get applications for a recruiter's job
const getJobApplications = async (req, res) => {
    try {
        const { id } = req.params;

        // verify the job belongs to the recruiter
        const job = await Job.findOne({ _id: id, postedBy: req.userId });

        if (!job) {
            return res.status(404).json({ message: 'Job not found or access denied' });
        }

        const applications = await Application.find({ job: id })
            .populate('applicant', 'name email resume phone profilePicture bio skills experience location')
            .populate('job', 'title')
            .sort({ appliedAt: -1 });

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getRecruiterJobs,
    getJobApplications
}
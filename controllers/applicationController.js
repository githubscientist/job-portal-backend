const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

const applyForJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const { coverLetter } = req.body;
        const userId = req.userId;

        // check if job exists and is active
        const job = await Job.findOne({ _id: jobId, isActive: true })
            .populate('company', 'name')
            .populate('postedBy', 'name email');

        if (!job) {
            return res.status(404).json({ message: 'Job not found or inactive' });
        }

        // check if the user already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // check application deadline
        if (job.applicationDeadline && new Date() > job.applicationDeadline) {
            return res.status(400).json({ message: 'Application deadline has passed' });
        }

        const newApplication = new Application({
            job: jobId,
            applicant: userId,
            coverLetter
        });

        await newApplication.save();

        // update the job applications count
        await Job.findByIdAndUpdate(jobId, { $inc: { applicationsCount: 1 } });

        // send a nontification to the job poster
        // sendEmail(job.postedBy.email, 'New Job Application', `You have a new application for your job posting: ${job.title}`);

        res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserApplications = async (req, res) => {
    try {
        const userId = req.userId;
        const applications = await Application.find({ applicant: userId })
            .populate({
                path: 'job',
                populate: 'company',
                select: 'name logo'
            })
            .sort({ appliedAt: -1 });

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status, notes } = req.body;
        const userId = req.userId;

        // find the application and verify if it belongs to a job posted by the user
        const application = await Application.findById(applicationId)
            .populate({
                path: 'job',
                populate: {
                    path: 'postedBy',
                }
            })
            .populate('applicant', 'name email');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (application.job.postedBy._id.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this application' });
        }

        // update application status
        application.status = status;
        application.notes = notes;
        application.reviewedBy = userId;
        application.reviewedAt = new Date();

        await application.save();

        // send notification to the applicant
        // sendEmail(application.applicant.email, 'Application Status Updated', `Your application for the job ${application.job.title} has been updated to: ${status}`);

        res.status(200).json({ message: 'Application status updated successfully', application });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getApplicationById = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const userId = req.userId;

        const application = await Application.findById(applicationId)
            .populate('applicant', 'name email phone profilePicture bio skills experience location')
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name logo'
                }
            })
            .populate('reviewedBy', 'name');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // check if the user is either the applicant or the job poster
        if (application.applicant._id.toString() !== userId && application.job.postedBy.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to view this application' });
        }

        res.status(200).json({ application });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    applyForJob,
    getUserApplications,
    updateApplicationStatus,
    getApplicationById
}

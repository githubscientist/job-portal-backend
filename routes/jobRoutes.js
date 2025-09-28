const express = require('express');
const { getAllJobs, getJobById, createJob, updateJob, deleteJob, getRecruiterJobs, getJobApplications } = require('../controllers/jobController');
const { isAuthenticated, allowUsers } = require('../middlewares/auth');

const jobRouter = express.Router();

// public routes
jobRouter.get('/', getAllJobs);
jobRouter.get('/:id', getJobById);

// protected routes for recruiters
jobRouter.post('/', isAuthenticated, allowUsers(['recruiter']), createJob);
jobRouter.put('/:id', isAuthenticated, allowUsers(['recruiter']), updateJob);
jobRouter.delete('/:id', isAuthenticated, allowUsers(['recruiter']), deleteJob);
jobRouter.get('/recruiter/jobs', isAuthenticated, allowUsers(['recruiter']), getRecruiterJobs);
jobRouter.get('/recruiter/jobs/:id/applications', isAuthenticated, allowUsers(['recruiter']), getJobApplications);

module.exports = jobRouter;
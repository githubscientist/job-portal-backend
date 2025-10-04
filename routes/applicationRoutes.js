const express = require('express');
const { isAuthenticated, allowUsers } = require('../middlewares/auth');
const { applyForJob, getUserApplications, updateApplicationStatus, getApplicationById } = require('../controllers/applicationController');

const applicationRouter = express.Router();

// all the routes defined should be authenticated
applicationRouter.use(isAuthenticated);

// user routes
applicationRouter.post('/:jobId/apply', allowUsers(['user']), applyForJob);
applicationRouter.get('/', allowUsers(['user']), getUserApplications);

// recruiter routes
applicationRouter.put('/:id/status', allowUsers(['recruiter']), updateApplicationStatus);

// shared routes -- user and recruiter
applicationRouter.get('/:id', allowUsers(['user', 'recruiter']), getApplicationById);

module.exports = applicationRouter;
const express = require('express');
const { isAuthenticated, allowUsers } = require('../middlewares/auth');
const { createCompany, getAllCompanies, updateCompany, deleteCompany, createRecruiter } = require('../controllers/adminController');

const companyRouter = express.Router();

companyRouter.use(isAuthenticated);
companyRouter.use(allowUsers(['admin']));

// all the routes are protected and only accessible by admin users
companyRouter.post('/', createCompany);
companyRouter.get('/', getAllCompanies);
companyRouter.put('/:id', updateCompany);
companyRouter.delete('/:id', deleteCompany);

// recruiter management
companyRouter.post('/recruiters', createRecruiter);

module.exports = companyRouter;
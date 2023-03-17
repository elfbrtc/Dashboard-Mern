const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware.js');

const {getAllCompanies, createCompany, deleteCompany, updateCompany} = require('../controllers/companyController.js');

router.route('/').get(getAllCompanies).post(createCompany)

router.route('/:id').delete(deleteCompany).put(updateCompany)

module.exports = router
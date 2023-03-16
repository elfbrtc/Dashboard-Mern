const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware.js');

const {getAllCompanies} = require('../controllers/companyController.js');

router.get('/', getAllCompanies, protect)

module.exports = router
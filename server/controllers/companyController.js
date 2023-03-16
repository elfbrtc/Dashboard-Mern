const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Company = require('../models/CompanyModel.js');


const getAllCompanies = asyncHandler (async (req, res) => {
})


module.exports = {
    getAllCompanies
};
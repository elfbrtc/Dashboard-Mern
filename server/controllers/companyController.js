const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Company = require('../models/CompanyModel.js');


const getAllCompanies = asyncHandler (async (req, res) => {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
})

const createCompany = asyncHandler (async (req, res) => {
    if (!req.body.companyName || !req.body.companyLegalNumber || !req.body.companyCountry || !req.body.companyWebsite) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const company= await Company.create({
        companyName: req.body.companyName,
        companyLegalNumber: req.body.companyLegalNumber,
        companyCountry: req.body.companyCountry,
        companyWebsite: req.body.companyWebsite
    })
    res.status(200).json(company);
})

const deleteCompany = asyncHandler (async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        res.status(400);
        throw new Error('Company not found');
    }
    await company.deleteOne();
    res.status(200).json({message: 'Company removed'});
})

const updateCompany = asyncHandler (async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        res.status(400);
        throw new Error('Company not found');
    }

    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedCompany);
})




module.exports = {
    getAllCompanies,
    createCompany,
    deleteCompany,
    updateCompany
};
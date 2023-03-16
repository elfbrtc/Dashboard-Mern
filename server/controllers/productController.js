const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel.js');


const getAllProduct = asyncHandler (async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

module.exports = {
    getAllProduct
};
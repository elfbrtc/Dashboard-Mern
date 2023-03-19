const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel.js');


const getAllProduct = asyncHandler (async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
})

const createProduct = asyncHandler (async (req, res) => {
    if (!req.body.productName || !req.body.productCategory || !req.body.productAmount || !req.body.productAmountUnit, !req.body.productCompany) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const product= await Product.create({
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        productAmount: req.body.productAmount,
        productAmountUnit: req.body.productAmountUnit,
        productCompany: req.body.productCompany
    })
    res.status(200).json(product);
})

const updateProduct= asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(400);
        throw new Error('Product not found');
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedProduct);
})

const deleteProduct = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(400);
        throw new Error('Product not found');
    }
    await product.deleteOne();
    res.status(200).json({message: 'Product removed'});
})

module.exports = {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
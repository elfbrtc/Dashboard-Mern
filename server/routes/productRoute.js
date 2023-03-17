const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware.js');
const {getAllProduct, createProduct, deleteProduct, updateProduct} = require('../controllers/productController.js');

router.route('/').get(getAllProduct).post(createProduct)

router.route('/:id').delete(deleteProduct).put(updateProduct)


module.exports = router
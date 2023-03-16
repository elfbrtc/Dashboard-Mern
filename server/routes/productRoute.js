const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware.js');
const {getAllProduct} = require('../controllers/productController.js');

router.get('/', getAllProduct, protect)

module.exports = router
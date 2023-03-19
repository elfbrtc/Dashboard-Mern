const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getAllUsers} = require('../controllers/userController.js');

const { protect } = require('../middleware/authMiddleware.js');
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)

module.exports = router
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');




router.post('/', auth, orderController.createOrder);

module.exports = router;

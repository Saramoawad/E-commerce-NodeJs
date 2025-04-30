const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/authMiddleware');




router.post('/', auth, cartController.createCart);
router.put('/:id', auth, cartController.updateCart);

module.exports = router;

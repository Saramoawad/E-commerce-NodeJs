const express=require('express');
const router=express.Router();
const productController= require('../controllers/productController');
const authMiddleware= require('../middlewares/authMiddleware');






router.post('/', authMiddleware, productController.createProduct);
router.get('/my-products', authMiddleware, productController.getMyProducts);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);
router.get('/search', productController.searchProducts);

module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');  

router.get('/product', productController.findAll);
router.get('/product/:id', productController.findById);
router.get('/product/code/:code', productController.findByCode);
router.post('/product', productController.create);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.delete);

module.exports = router;
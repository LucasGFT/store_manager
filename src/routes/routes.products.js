const express = require('express');
const { productsController } = require('../controllers');
const { validationName, updatedProducts, deletedProduct } = require('../middlewares/validations');

const router = express.Router();

router.get('/search', productsController.searchNameByKeyword);

router.get('/', productsController.listProducts);

router.get('/:id', productsController.listProductById);

router.post('/', validationName, productsController.insertProduct);

router.put('/:id', updatedProducts, productsController.updatedProducts);

router.delete('/:id', deletedProduct, productsController.deletedProduct);

module.exports = router;
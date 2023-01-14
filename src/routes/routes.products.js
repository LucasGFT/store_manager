const express = require('express');
const { productsController } = require('../controllers');
const { validationName } = require('../middlewares/validations');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.listProductById);
router.post('/', validationName, productsController.inserirProduto);

module.exports = router;
const express = require('express');
const { productsController } = require('../controllers');
const {
  validationName, atualizarProducts, requisitosDeletar } = require('../middlewares/validations');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.listProductById);
router.post('/', validationName, productsController.inserirProduto);
router.put('/:id', atualizarProducts, productsController.atualizarProducts);
router.delete('/:id', requisitosDeletar, productsController.deletarProduto);

module.exports = router;
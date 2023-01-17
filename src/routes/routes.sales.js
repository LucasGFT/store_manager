const express = require('express');
const { salesController } = require('../controllers');
const { salesValidacao, requisitosDeletarVenda } = require('../middlewares/validations');

const router = express.Router();

router.get('/', salesController.listaTodasSales);
router.get('/:id', salesController.findSaleById);
router.post('/', salesValidacao, salesController.inserirSales);
router.delete('/:id', requisitosDeletarVenda, salesController.deletarVenda);

module.exports = router;

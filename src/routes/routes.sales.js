const express = require('express');
const { salesController } = require('../controllers');
const {
  salesValidacao,
  requisitosDeletarVenda, requisitosAtualizarVenda } = require('../middlewares/validations');

const router = express.Router();

router.get('/', salesController.listaTodasSales);
router.get('/:id', salesController.findSaleById);
router.post('/', salesValidacao, salesController.inserirSales);
router.delete('/:id', requisitosDeletarVenda, salesController.deletarVenda);
router.put('/:id', requisitosAtualizarVenda, salesController.atualizarSales);

module.exports = router;

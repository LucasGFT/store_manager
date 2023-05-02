const express = require('express');
const { salesController } = require('../controllers');
const { 
  salesValidacao,
  requisitosDeletarVenda,
  requisitosAtualizarVenda } = require('../middlewares/validations');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.findSaleById);
router.post('/', salesValidacao, salesController.registerSale);
router.delete('/:id', requisitosDeletarVenda, salesController.deletedSale);
router.put('/:id', requisitosAtualizarVenda, salesController.updatedSales);

module.exports = router;

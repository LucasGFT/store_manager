const express = require('express');
const { salesController } = require('../controllers');
const { salesValidacao } = require('../middlewares/validations');

const router = express.Router();

router.get('/', salesController.listaTodasSales);
router.get('/:id', salesController.findSaleById);
router.post('/', salesValidacao, salesController.inserirSales);

module.exports = router;

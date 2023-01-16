const { Router } = require('express');
const productsRouter = require('./routes.products');
const salesRouter = require('./routes.sales');

const router = Router();

router.use('/products', productsRouter);
router.use('/sales', salesRouter);

module.exports = router;
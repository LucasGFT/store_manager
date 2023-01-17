const validationName = async (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};
const { productsModel } = require('../models');

const salesValidacaoDois = async (res, _req, next, array) => {
  const a = await productsModel.findAll();
  const todosIdProdutos = a.map((element) => element.id);
  const teste = array.every((element) =>
    todosIdProdutos.includes(element.productId));
  if (!teste) { return res.status(404).json({ message: 'Product not found' }); }
  next();
};

const salesValidacao = async (req, res, next) => {
  const array = req.body;
  const contemProductId = array.every((element) => element.productId);
  const contemQuantity = array.every((element) => element.quantity);
  const quantityDiferenteDeZero = array.every((element) => element.quantity !== 0);
  const quantityMinimo = array.every((element) => element.quantity <= 0);

  if (!contemProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!contemQuantity && quantityDiferenteDeZero) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantityMinimo) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  salesValidacaoDois(res, req, next, array);
};

const atualizarProducts = async (req, res, next) => { 
  const { name } = req.body;
  if (name === undefined) {
    return res.status(400).json({ message: '"name" is required' });
  } if (name !== undefined && name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
  next();
};

module.exports = {
  validationName,
  salesValidacao,
  atualizarProducts,
};
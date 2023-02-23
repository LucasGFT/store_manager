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
const { productsModel, salesModel } = require('../models');

const salesValidacaoDois = async (res, _req, next, array) => {
  const a = await productsModel.findAll();
  const todosIdProdutos = a.map((element) => element.id);
  const teste = array.every((element) =>
    todosIdProdutos.includes(element.productId));
  if (!teste) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const salesValidacao = async (req, res, next) => {
  const array = req.body;
  const contemProductId = array.every((element) => element.productId);
  const contemQuantity = array.every((element) => element.quantity);
  const quantityDiferenteDeZero = array.every(
    (element) => element.quantity !== 0,
  );
  const quantityMinimo = array.every((element) => element.quantity <= 0);
  if (!contemProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!contemQuantity && quantityDiferenteDeZero) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantityMinimo) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  salesValidacaoDois(res, req, next, array);
};

const atualizarProducts = async (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name !== undefined && name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const requisitosDeletarProduto = async (req, res, next) => {
  const { id } = req.params;
  const a = await productsModel.findById(id);
  if (a === undefined || a === null) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const requisitosDeletarVenda = async (req, res, next) => {
  const { id } = req.params;
  const a = await salesModel.findSaleById(id);
  if (a.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  next();
};

const verificarQuantity = async (req, res) => {
  const array = req.body;
  const contemQuantity = array.every(
    (element) => element.quantity !== null && element.quantity !== undefined,
  );
  const menorQueZero = array.every((element) => element.quantity > 0);
  if (!contemQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (!menorQueZero) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return null;
};

const testess = (req, listaProduct) => {
  const a = [];
  const array = req.body;
  array.forEach((elem) =>
    listaProduct.forEach((element) => {
      if (elem.productId === element.id) a.push('true');
    }));
  const contemProductId = array.every(
    (element) => element.productId !== null && element.productId !== undefined,
  );
  return { primeiro: contemProductId, segundo: a };
};

const verificarProductId = async (req, res) => {
  const listaProduct = await productsModel.findAll();
  const result = testess(req, listaProduct);
  if (!result.primeiro) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (result.segundo.length !== req.body.length) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return null;
};

const requisitosAtualizarVenda = async (req, res, next) => {
  const { id } = req.params;
  const teste = await salesModel.findSaleById(id);
  if (teste.length < 1) {
    return res.status(404).json({ message: 'Sale not found' });
  } if (teste.length >= 1) {
    const ss = await verificarQuantity(req, res);
    const s = await verificarProductId(req, res);
    if (s === null && ss === null) next();
  }
};

// const t = async () => {
//   await requisitosAtualizarVenda(1);
// };

// t();

module.exports = {
  validationName,
  salesValidacao,
  atualizarProducts,
  requisitosDeletarProduto,
  requisitosDeletarVenda,
  requisitosAtualizarVenda,
};

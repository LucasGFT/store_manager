const { productsModel, salesModel } = require('../models');

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

const validationFindSale = async (res, _req, next, array) => {
  const arrayProducts = await productsModel.findAll();
  const allIdProducts = arrayProducts.map((element) => element.id);
  const result = array.every((element) =>
    allIdProducts.includes(element.productId));
  if (!result) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const validationSale = async (req, res, next) => {
  const arrayBody = req.body;
  const containsProductId = arrayBody.every((element) => element.productId);
  const containsQuantity = arrayBody.every((element) => element.quantity);
  const quantityDifferentFromZero = arrayBody.every(
    (element) => element.quantity !== 0,
  );
  const quantityMinimum = arrayBody.every((element) => element.quantity <= 0);
  if (!containsProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!containsQuantity && quantityDifferentFromZero) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantityMinimum) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  validationFindSale(res, req, next, arrayBody);
};

const updatedProducts = async (req, res, next) => {
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

const deletedProduct = async (req, res, next) => {
  const { id } = req.params;
  const a = await productsModel.findById(id);
  if (a === undefined || a === null) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const requirementsDeletedSale = async (req, res, next) => {
  const { id } = req.params;
  const a = await salesModel.findSaleById(id);
  if (a.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  next();
};

const verifyQuantity = async (req, res) => {
  const array = req.body;
  const containsQuantity = array.every(
    (element) => element.quantity !== null && element.quantity !== undefined,
  );
  const lessThanZero = array.every((element) => element.quantity > 0);
  if (!containsQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (!lessThanZero) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return null;
};

const verifyContainsProduct = (req, listProducts) => {
  const arrayResult = [];
  const array = req.body;
  array.forEach((elem) =>
    listProducts.forEach((element) => {
      if (elem.productId === element.id) arrayResult.push('true');
    }));
  const containsProduct = array.every(
    (element) => element.productId !== null && element.productId !== undefined,
  );
  return { contains: containsProduct, array: arrayResult };
};

const verifyProducts = async (req, res) => {
  const listProducts = await productsModel.findAll();
  const result = verifyContainsProduct(req, listProducts);
  if (!result.contains) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (result.array.length !== req.body.length) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return null;
};

const requirementsUpdateSale = async (req, res, next) => {
  const { id } = req.params;
  const teste = await salesModel.findSaleById(id);
  if (teste.length < 1) {
    return res.status(404).json({ message: 'Sale not found' });
  } if (teste.length >= 1) {
    const ss = await verifyQuantity(req, res);
    const s = await verifyProducts(req, res);
    if (s === null && ss === null) next();
  }
};

module.exports = {
  validationName,
  validationSale,
  updatedProducts,
  deletedProduct,
  requirementsDeletedSale,
  requirementsUpdateSale,
};

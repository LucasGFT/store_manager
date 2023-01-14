const ID_NOT_INCLUSE = 'ID_NOT_INCLUSE';
const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (product) return { type: null, message: product };
  return { type: ID_NOT_INCLUSE, message: 'Product not found' };
};

const insert = async (product) => {
  const produto = await productsModel.insert(product);
  return { type: null, message: produto };
};

module.exports = {
  findAll,
  findById,
  insert,
};
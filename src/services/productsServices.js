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

const updatedProducts = async (name, id) => {
  const atualiza = await productsModel.updatedProducts(name, id);
  if (atualiza > 0) return { type: null, message: atualiza };
  if (atualiza === 0) return { type: 'Product not found', message: atualiza };
};

const deletedProduct = async (id) => {
  const affectedRows = await productsModel.deletedProduct(id);
  if (affectedRows === 1) return { type: null, message: affectedRows };
};

const searchNameByKeyword = async (name) => {
  const result = await productsModel.searchNameByKeyword(name);
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  insert,
  updatedProducts,
  deletedProduct,
  searchNameByKeyword,
};
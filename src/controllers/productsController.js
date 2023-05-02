const { productsServices } = require('../services');

const listProducts = async (_req, res) => {
  const { type, message } = await productsServices.findAll();

  if (type) return res.status(400).json(message);

  return res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.findById(id);

  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const nome = req.body;
  const { message } = await productsServices.insert(nome);

  return res.status(201).json(message);
};

const updatedProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const retorno = {
    id: Number(id),
    name,
  };
  const { type } = await productsServices.updatedProducts(name, id);
  if (type === null) return res.status(200).json(retorno);
  if (type === 'Product not found') return res.status(404).json({ message: 'Product not found' });
};

const deletedProduct = async (req, res) => {
  const { id } = req.params;
  const { type } = await productsServices.deletedProduct(id);
  if (type === null) return res.status(204).json();
};

const searchNameByKeyword = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsServices.searchNameByKeyword(q);
  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  listProductById,
  insertProduct,
  updatedProducts,
  deletedProduct,
  searchNameByKeyword,
};

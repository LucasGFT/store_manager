// const frisby = require('frisby');
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

const inserirProduto = async (req, res) => {
  const nome = req.body;
  const { message } = await productsServices.insert(nome);

  return res.status(201).json(message);
};

const atualizarProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const retorno = {
    id: Number(id),
    name,
  };
  const { type } = await productsServices.atualizarProducts(name, id);
  if (type === null) return res.status(200).json(retorno);
  if (type === 'Product not found') return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  listProducts,
  listProductById,
  inserirProduto,
  atualizarProducts,
};

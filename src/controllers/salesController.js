const { salesServices } = require('../services');

const registerSale = async (req, res) => {
  const nome = req.body;
  const { message } = await salesServices.registerSale(nome);
  const obj = {
    id: message.id,
    itemsSold: message.itemsSold,
  };
  return res.status(201).json(obj);
};

const listSales = async (_req, res) => {
  const { message } = await salesServices.listSales();
  return res.status(200).json(message);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.findSaleById(id);
  if (type !== null) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(message);
};

const deletedSale = async (req, res) => {
  const { id } = req.params;
  const { message } = await salesServices.deletedSale(id);
  if (message > 0) return res.status(204).json();
};

const updatedSales = async (req, res) => {
  const { id } = req.params;
  const array = req.body;
  const { type, message } = await salesServices.updatedSales(id, array);
  if (type === null) return res.status(200).json(message);
};

module.exports = {
  registerSale,
  listSales,
  findSaleById,
  deletedSale,
  updatedSales,
};

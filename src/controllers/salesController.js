const { salesServices } = require('../services');

const inserirSales = async (req, res) => {
  const nome = req.body;
  const { message } = await salesServices.cadastroVenda(nome);
  const obj = {
    id: message.id,
    itemsSold: message.itemsSold,
  };
  return res.status(201).json(obj);
};

const listaTodasSales = async (_req, res) => {
  const { message } = await salesServices.listaTodasSales();
  return res.status(200).json(message);
};

const findSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.findSaleById(id);
  if (type !== null) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(message);
};

module.exports = {
  inserirSales,
  listaTodasSales,
  findSaleById,
};

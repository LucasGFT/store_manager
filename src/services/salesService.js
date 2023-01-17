const { salesModel } = require('../models');

const cadastroVenda = async (obj) => {
  const product = await (await salesModel.cadastroVenda(obj));
  return { type: null, message: product };
};

const listaTodasSales = async () => {
  const lista = await salesModel.listaTodasSales();
  return { type: null, message: lista };
};

const findSaleById = async (id) => {
  const lista = await salesModel.findSaleById(id);
  if (lista.length === 0) return { type: 'nao encontrou', message: lista };
  return { type: null, message: lista };
};

module.exports = {
  cadastroVenda,
  listaTodasSales,
  findSaleById,
};
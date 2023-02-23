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
  if (lista.length < 1) return { type: 'nao encontrou', message: lista };
  return { type: null, message: lista };
};

const deletarVenda = async (id) => {
  const affectedRows = await salesModel.deletarVenda(id);
  return { type: null, message: affectedRows };
};

const atualizarSales = async (id, array) => {
  await salesModel.atualizarSales(id, array);
  const obj = {
    saleId: id,
    itemsUpdated: array,
  };
  return { type: null, message: obj };
};

module.exports = {
  cadastroVenda,
  listaTodasSales,
  findSaleById,
  deletarVenda,
  atualizarSales,
};
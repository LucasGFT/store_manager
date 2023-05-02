const { salesModel } = require('../models');

const registerSale = async (obj) => {
  const product = await (await salesModel.registerSale(obj));
  return { type: null, message: product };
};

const listSales = async () => {
  const lista = await salesModel.listSales();
  return { type: null, message: lista };
};

const findSaleById = async (id) => {
  const lista = await salesModel.findSaleById(id);
  if (lista.length < 1) return { type: 'nao encontrou', message: lista };
  return { type: null, message: lista };
};

const deletedSale = async (id) => {
  const affectedRows = await salesModel.deletedSale(id);
  return { type: null, message: affectedRows };
};

const updatedSales = async (id, array) => {
  await salesModel.updatedSales(id, array);
  const obj = {
    saleId: id,
    itemsUpdated: array,
  };
  return { type: null, message: obj };
};

module.exports = {
  registerSale,
  listSales,
  findSaleById,
  deletedSale,
  updatedSales,
};
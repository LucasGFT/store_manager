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
// const t = async () => {
//   console.log(await listaTodasSales());
// };
// t();
// const objTest = [
//   {
//     productId: 2,
//     quantity: 1,
//   },
//   {
//     productId: 2,
//     quantity: 5,
//   },
// ];
  // const temProductId = product.every((element) => element.productId);
  // console.log(temProductId === true);
  // const a = [1, 5, 7, 6];
  // const test = await Promise.all(product);

module.exports = {
  cadastroVenda,
  listaTodasSales,
  findSaleById,
};
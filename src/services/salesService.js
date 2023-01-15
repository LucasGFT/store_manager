const { salesModel } = require('../models');

const cadastroVenda = async (obj) => {
  const product = await (await salesModel.cadastroVenda(obj));
  // const temProductId = product.every((element) => element.productId);
  // console.log(temProductId === true);
  // const a = [1, 5, 7, 6];
  // const test = await Promise.all(product);
  return { type: null, message: product };
};

// const arrayTest = [
//   {
//     productId: 15,
//     quantity: 1,
//   },
//   {
//     productId: 2,
//     quantity: 5,
//   },
// ];
// const d = async () => {
//   await console.log(await cadastroVenda(arrayTest));
// };
// d();

module.exports = {
  cadastroVenda,
};
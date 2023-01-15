const { salesModel } = require('../models');

const cadastroVenda = async (obj) => {
  const product = await (await salesModel.cadastroVenda(obj));
  return { type: null, message: product };
};

  // const temProductId = product.every((element) => element.productId);
  // console.log(temProductId === true);
  // const a = [1, 5, 7, 6];
  // const test = await Promise.all(product);

module.exports = {
  cadastroVenda,
};
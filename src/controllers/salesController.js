// const frisby = require('frisby');
const { salesServices } = require('../services');

const inserirSales = async (req, res) => {
  // const { message } = await productsServices.insert(nome);
  const nome = req.body;
  // const array = [
  // {
  //   productId: 2,
  //   quantity: 1,
  // },
  // {
  //   productId: 2,
  //   quantity: 5,
  // },
// ];
  const { type, message } = await salesServices.cadastroVenda(nome);
  // const 
  if (type === 'NAO_CONTEM_PRODUTO_COM_ID') {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(201).json(message);
};

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
// const d = async () => {
//   await inserirSales(objTest);
// };
// d();

module.exports = {
  inserirSales,
};

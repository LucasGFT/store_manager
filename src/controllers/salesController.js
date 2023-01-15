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

//   const arrayTest = [
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
//   await inserirSales();
// };
// d();

module.exports = {
  inserirSales,
};

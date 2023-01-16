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

// const tttt = async () => {
//   const lll = await listaTodasSales();
//   console.log(lll);
// };

// tttt();

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
  listaTodasSales,
  findSaleById,
};

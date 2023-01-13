const ID_NOT_INCLUSE = 'ID_NOT_INCLUSE';
const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (product) return { type: null, message: product };
  return { type: ID_NOT_INCLUSE, message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};

// const listPassengers = async (_req, res) => {
//   const { type, message } = await passengerService.findAll();

//   if (type) return res.status(mapError(type)).json(message);

//   res.status(200).json(message);
// };

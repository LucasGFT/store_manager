// const frisby = require('frisby');
const { productsServices } = require('../services');

const listProducts = async (_req, res) => {
  const { type, message } = await productsServices.findAll();

  if (type) return res.status(400).json(message);

  res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const a = await productsServices.findById(id);

  if (a.type) return res.status(404).json({ message: a.message });
  return res.status(200).json(a.message);
};

// const a = async () => {
//   const { status, json } = await frisby.get('localhost:3000/products/999');
//   console.log(status);
//   console.log(json);
// };

// a();

// const findById = async (passengerId) => {
//   const error = schema.validateId(passengerId);
//   if (error.type) return error;

//   const passenger = await passengerModel.findById(passengerId);
//   if (!passenger)
//     return { type: "PASSENGER_NOT_FOUND", message: "Passenger not found" };

//   return { type: null, message: passenger };
// };

// const getPassenger = async (req, res) => {
//   const { id } = req.params;
//   const { type, message } = await passengerService.findById(id);

//   if (type) return res.status(mapError(type)).json(message);

//   res.status(200).json(message);
// };

module.exports = {
  listProducts,
  listProductById,
};
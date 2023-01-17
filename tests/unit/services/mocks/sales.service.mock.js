const message = {
  id: 38,
  itemsSold: [
    { productId: 2, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
  listProducts: [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ],
};

const resultado = {
  type: null,
  message: [
    {
      saleId: 1,
      date: "2023-01-17T01:35:43.000Z",
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date: "2023-01-17T01:35:43.000Z",
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: "2023-01-17T01:35:43.000Z",
      productId: 3,
      quantity: 15,
    },
  ],
};

const testeService = { type: null, message };

module.exports = { message, testeService, resultado };

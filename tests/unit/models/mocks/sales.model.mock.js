const dataSales = { id: 1, date: "2023-01-15 14:46:15" };
const product = {
  id: 5,
  itemSold: [
    {
      productId: 2,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const resultado = [
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
];

const resultadoPorId = [
  { date: "2023-01-16T22:35:43.000Z", productId: 1, quantity: 5 },
  { date: "2023-01-16T22:35:43.000Z", productId: 2, quantity: 10 },
];

const resultadoObj = [
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
];

module.exports = {
  dataSales,
  product,
  resultado,
  resultadoPorId,
  resultadoObj,
};

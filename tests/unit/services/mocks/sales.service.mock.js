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


const testeService = { type: null, message };

module.exports = { message, testeService };

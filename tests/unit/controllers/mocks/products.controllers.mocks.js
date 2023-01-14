const products = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const productComId = { id: 1, ...products };

module.exports = { products, productComId };

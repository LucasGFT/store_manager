const connection = require('./connection');
const { findAll } = require('./productsModel');

const cadastraDataVenda = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW());',
  );
  return insertId;
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

const cadastroVenda = async (obj) => {
  const id = await cadastraDataVenda();
  const listProducts = await findAll();
  const novoObj = {
    id,
    itemsSold: obj,
    listProducts,
  };
  const a = obj.map(
    (e) =>
      `INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (${id}, ${
      e.productId}, ${e.quantity});`,
  );
  a.map((el) => connection.execute(el));
  return novoObj;
};

// const test = {
//   saleId: 1,
//   productId: 5,
//    // 1 ou 2, 1 ao 5, qlq

//   quantity: 55,
// // // };
// const a = async (ss) => {
//   console.log(await cadastroVenda(ss));
// };
// a(objTest);

module.exports = {
  cadastroVenda,
  cadastraDataVenda,
};

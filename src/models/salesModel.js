const connection = require('./connection');
const { findAll } = require('./productsModel');

const registerDateSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW());',
  );
  return insertId;
};

const registerSale = async (obj) => {
  const id = await registerDateSale();
  const listProducts = await findAll();
  const novoObj = {
    id,
    itemsSold: obj,
    listProducts,
  };
  const a = obj.map(
    (e) =>
      `INSERT INTO StoreManager.sales_products (
        sale_id, product_id, quantity) VALUE (${id}, ${e.productId}, ${e.quantity});`,
  );
  a.map((el) => connection.execute(el));
  return novoObj;
};

const selectSale = async () => {
  const [resultado] = await connection.execute(
    'SELECT * FROM StoreManager.sales;',
  );
  return resultado;
};
const selectSaleProduct = async () => {
  const [resultado] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products;',
  );
  return resultado;
};

const createObjResponse = async (sales, salesProduct) => {
  const { length } = salesProduct;
  const tt = [];
  for (let index = 0; index < length; index += 1) {
    sales.forEach((element) => {
      if (element.id === salesProduct[index].sale_id) {
        const obj = {
          saleId: salesProduct[index].sale_id,
          date: element.date,
          productId: salesProduct[index].product_id,
          quantity: salesProduct[index].quantity,
        };
        tt.push(obj);
      }
    });
  }
  return tt;
};

const listSales = async () => {
  const sales = await selectSale(); 
  const salesProduct = await selectSaleProduct();
  const obj = await createObjResponse(sales, salesProduct);
  return obj;
};

const findSaleById = async (id) => {
  const sales = await selectSale(); 
  const [resultado] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  const objAntigo = await createObjResponse(sales, resultado);
  const resposta = objAntigo.map((element) => {
    const objCerto = {
      date: element.date,
      productId: element.productId,
      quantity: element.quantity,
    };
    return objCerto;
  });
  return resposta;
};

const deletedSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?;',
    [id],
  );
  return affectedRows;
};

const deletedSaleProductById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?;',
    [id],
  );
    return affectedRows;
  };

const newSale = async (id, array) => {
    const result = array.map(async (element) => {
      const { productId, quantity } = element;
      const [{ affectedRows }] = await connection.execute(
        `INSERT INTO sales_products (
          sale_id, product_id, quantity) VALUE (${id}, ${productId}, ${quantity})`,
      );
      return affectedRows;
    });
    return result;
};

const updatedSales = async (id, array) => {
  const affectRow = await deletedSaleProductById(id);
  if (affectRow > 0) return newSale(id, array);
};

module.exports = {
  registerSale,
  registerDateSale,
  listSales,
  findSaleById,
  selectSale,
  selectSaleProduct,
  createObjResponse,
  deletedSale,
  updatedSales,
};

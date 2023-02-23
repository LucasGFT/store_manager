const connection = require('./connection');
const { findAll } = require('./productsModel');

const cadastraDataVenda = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW());',
  );
  return insertId;
};

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
      `INSERT INTO StoreManager.sales_products (
        sale_id, product_id, quantity) VALUE (${id}, ${e.productId}, ${e.quantity});`,
  );
  a.map((el) => connection.execute(el));
  return novoObj;
};

const selecionarSales = async () => {
  const [resultado] = await connection.execute(
    'SELECT * FROM StoreManager.sales;',
  );
  return resultado;
};
const selecionarSalesProduct = async () => {
  const [resultado] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products;',
  );
  return resultado;
};

const criarObjResposta = async (sales, salesProduct) => {
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

const listaTodasSales = async () => {
  const sales = await selecionarSales(); 
  const salesProduct = await selecionarSalesProduct();
  const obj = await criarObjResposta(sales, salesProduct);
  return obj;
};

const findSaleById = async (id) => {
  const sales = await selecionarSales(); 
  const [resultado] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  const objAntigo = await criarObjResposta(sales, resultado);
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

const deletarVenda = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?;',
    [id],
  );
  return affectedRows;
};

const deletarSalesProductById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?;',
    [id],
  );
    return affectedRows;
  };

const cadastrarNovaVenda = async (id, array) => {
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

const atualizarSales = async (id, array) => {
  const affectRow = await deletarSalesProductById(id);
  if (affectRow > 0) return cadastrarNovaVenda(id, array);
};

module.exports = {
  cadastroVenda,
  cadastraDataVenda,
  listaTodasSales,
  findSaleById,
  selecionarSales,
  selecionarSalesProduct,
  criarObjResposta,
  deletarVenda,
  atualizarSales,
};

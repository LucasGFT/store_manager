const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const insert = async ({ name }) => {
  // INSERT INTO StoreManager.products (name) VALUE ('Homem de Ferro')
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );

  const pessoaAdicionada = await findById(insertId);
    return pessoaAdicionada;
};

module.exports = {
  findAll,
  findById,
    insert,
};

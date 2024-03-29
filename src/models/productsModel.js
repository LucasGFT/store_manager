const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
    );
    return product;
  };

const insert = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  const pessoaAdicionada = await findById(insertId);
    return pessoaAdicionada;
};

const updatedProducts = async (name, id) => {
  const teste = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?;', [name, id],
  );
  const { affectedRows } = teste[0];
  return affectedRows;
};

const deletedProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?;', [id],
  );
  return affectedRows;
};

const searchNameByKeyword = async (palavra) => {
  if (palavra === '') {
    const [resultSemNada] = await connection.execute(
      'SELECT * FROM StoreManager.products',
    );
    return resultSemNada;
  }
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?;', [`%${palavra}%`],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  updatedProducts,
  deletedProduct,
  searchNameByKeyword,
};

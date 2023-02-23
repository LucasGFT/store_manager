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
  // const t = async () => console.log(await findById(67673) === undefined);
  // t();

const insert = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  const pessoaAdicionada = await findById(insertId);
    return pessoaAdicionada;
};

const atualizarProducts = async (name, id) => {
  const teste = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?;', [name, id],
  );
  const { affectedRows } = teste[0];
  return affectedRows;
};

const deletarProduto = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?;', [id],
  );
  return affectedRows;
};

const procurarNamePorPalavra = async (palavra) => {
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

// const t = async () => {
//   const a = await procurarNamePorPalavra('');
//   console.log(a);
//   return a;
// };
// t();

module.exports = {
  findAll,
  findById,
  insert,
  atualizarProducts,
  deletarProduto,
  procurarNamePorPalavra,
};

const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(router);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
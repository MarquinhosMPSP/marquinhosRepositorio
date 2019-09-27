const express = require('express');
const mongoose = require('mongoose');
const consign = require('consign');
const cors = require('cors');

//iniciando e configurando o app
const app = express();
const port = process.env.PORT || 3001
app.use(express.json())
app.use(cors());

//iniciando o DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nodeapi', { useNewUrlParser: true });

//iniciando o autoload
consign()
  .include('./src/models')
  .then('./src/controller')
  .then('./src/routes')
  .then('./src/core')
  .into(app)

//rodando o servidor
app.listen(port, () => {
  console.log('Servidor rodando na porta ' + port)
})

module.exports = app
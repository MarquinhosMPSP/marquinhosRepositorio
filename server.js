const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

//iniciando o app
const app = express();
app.use(express.json())

//configurando CORS - mudar dps para n permitir qlqr origin
app.use(cors());

//iniciando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true});

requireDir('./src/models');

app.use('/api', require('./src/routes'))

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
  
})

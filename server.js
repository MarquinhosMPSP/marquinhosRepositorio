const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

//iniciando o app
const app = express();
const port = process.env.PORT || 3001
app.use(express.json())

//configurando CORS - mudar dps para n permitir qlqr origin
app.use(cors());

//iniciando o DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nodeapi');

requireDir('./src/models');

app.use('/api', require('./src/routes'))

app.listen(port, () => {
  console.log('Servidor rodando na porta ' + port)
})

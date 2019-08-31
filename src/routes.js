const express = require('express');
const routes = express.Router();
const usuarioController = require('./controller/usuarioController')

routes.get('/usuario', usuarioController.index);
routes.get('/usuario/:id', usuarioController.pesquisar)
routes.post('/usuario', usuarioController.cadastro)
routes.put('/usuario/:id', usuarioController.atualizar)
routes.delete('/usuario/:id', usuarioController.excluir)

module.exports = routes;
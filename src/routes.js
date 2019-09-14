const express = require('express');
const routes = express.Router();
const usuarioController = require('./controller/usuarioController')
const scraperController = require('./core/controller/scraperController')

routes.get('/usuario', usuarioController.index);
routes.post('/autenticar', usuarioController.autenticar);
routes.get('/usuario/:id', usuarioController.pesquisar)
routes.post('/usuario', usuarioController.cadastro)
routes.put('/usuario/:id', usuarioController.atualizar)
routes.delete('/usuario/:id', usuarioController.excluir)

routes.get('/consultar', scraperController.consultar)

module.exports = routes;
module.exports = function(app) {
  const usuario = app.src.controller.usuarioController;

  app.route('/usuario')
     .get(usuario.index)
     .post(usuario.cadastro)
     
  app.route('/usuario/:id')
     .get(usuario.pesquisar)
     .put(usuario.atualizar)
     .delete(usuario.excluir)
  
  app.post('/autenticar', usuario.autenticar)
}
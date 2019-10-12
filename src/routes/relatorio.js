module.exports = function(app) {
  const relatorio = app.src.controller.relatorioController;

  app.get("/historico/:usuario", relatorio.historico);
  app.get("/consultar/:usuario", relatorio.consultarUltimo);
};

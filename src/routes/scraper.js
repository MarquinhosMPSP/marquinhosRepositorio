module.exports = function(app) {
  const scraper = app.src.controller.scraperController;

  app.get('/consultar/:usuario/:operacao/:id', scraper.consultar)
}

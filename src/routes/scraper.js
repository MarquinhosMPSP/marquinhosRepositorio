module.exports = function(app) {
  const scraper = app.src.controller.scraperController;

  app.get("/gerar/:usuario", scraper.gerar);
  app.post("/gerar", scraper.gerar);
};

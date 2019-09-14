const scraper = require('../index')

module.exports = {
  async consultar(req, res) {
    scraper.run()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({'message': 'Houve um erro ao gerar o relatório'}))
  }
}
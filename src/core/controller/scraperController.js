const scraper = require('../index')

module.exports = {
  async consultar(req, res) {
    const data = await scraper.run();
    console.log('data', data);
    
    res.json(data)
  }
}
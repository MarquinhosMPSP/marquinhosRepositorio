const scraper = require('../core/index')
const relatorioController = require('./relatorioController')

module.exports = {
  async consultar(req, res) {
    const operacao = req.params.operacao;
    const usuario = req.params.usuario;
    if(operacao == 'update') { 
      scraper.run(usuario)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json({'message': 'Houve um erro ao gerar o relatório'}))
    } else if(operacao == 'getOne') {
      relatorioController.consultarUm(req, res)
    } else{
      relatorioController.consultar(req, res)
    } 
    
  }
}
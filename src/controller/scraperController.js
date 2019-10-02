const run = require('../core/index')
const relatorioController = require('./relatorioController')

module.exports = {
  async consultar(req, res) {
    const operacao = req.params.operacao;
    if(operacao == 'update') {
      run()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json({'message': 'Houve um erro ao gerar o relatório'}))
        return
    }
    relatorioController.consultar(req, res)
  }
}
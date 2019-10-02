const mongoose = require('mongoose')
const Relatorio = mongoose.model('relatorioModel')

module.exports = {
  async historico(req, res) {
    const usuario = req.params.usuario;
    const relatorios = await Relatorio.find({ usuario }).select('dataRelatorio cnpj nome uf cep municipio bairro numero zona').sort({ dataRelatorio: 'desc' })
    if (relatorios.length < 0) return res.status(404).json(null);
    res.json(relatorios);
  },
  async consultar(req, res) {
    const usuario = req.params.usuario;
    const relatorio = await Relatorio.findOne({ usuario }, { __v: 0 }).sort({ dataRelatorio: 'desc' })
    if (!relatorio) return res.status(404).json(null);
    res.json(relatorio);
  }
}
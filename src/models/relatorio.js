const moongose = require('mongoose')

const relatorioSchema = moongose.Schema({
  usuario: {
    type: String,
    required: true
  },
  dataRelatorio: {
    type: String,
    required: true
  },
  tipoDeEmpresa: {
    type: String
  },
  dataDaConstituicao: {
    type: String
  },
  inicioDaAtividade: {
    type: String
  },
  cnpj: {
    type: String
  },
  capital: {
    type: String
  },
  logradouro: {
    type: String
  },
  bairro: {
    type: String
  },
  municipio: {
    type: String
  },
  numero: {
    type: String
  },
  complemento: {
    type: String
  },
  cep: {
    type: String
  },
  uf: {
    type: String
  },
  nome: {
    type: String
  },
  titulo: {
    type: String
  },
  nascimento: {
    type: String
  },
  zona: {
    type: String
  },
  endereco: {
    type: String
  },
  dataDomicilio: {
    type: String
  },
  nomePai: {
    type: String
  },
  nomeMae: {
    type: String
  },
  naturalidade: {
    type: String
  },
  cdValidacao: {
    type: String
  },
  arispPathPdf: {
    type: Array
  },
  detranPathPdf: {
    type: Array
  },
  detranPathImg: {
    type: Array
  },
})

moongose.model('relatorioModel', relatorioSchema)
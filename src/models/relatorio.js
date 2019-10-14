const moongose = require('mongoose')

const relatorioSchema = new moongose.Schema({
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
  nroVEC: {
    type: String
  },
  sexo: {
    type: String
  },
  rg: {
    type: String
  },
  tipoRg: {
    type: String
  },
  dtEmissaoRg: {
    type: String 
  },
  estadoCivil: {
    type: String
  },
  naturalizado: {
    type: String
  },
  grauInstrucao: {
    type: String
  },
  corPele: {
    type: String
  },
  alcunha: {
    type: String
  },
  postoIdentificacao: {
    type: String
  },
  formulaFundamental: {
    type: String
  },
  corOlhos: {
    type: String
  },
  cabelo: {
    type: String
  },
  profissao: {
    type: String
  },
  endResidencial: {
    type: String
  },
  ie: {
    type: String
  },
  nomeEmpresarial: {
    type: String
  },
  drt: {
    type: String
  },
  situacao: {
    type: String
  },
  dtInscricaoEstado: {
    type: String
  },
  regimeEstadual: {
    type: String
  },
  postoFiscal: {
    type: String
  },
  nomeFantasia: {
    type: String
  },
  nire: {
    type: String
  },
  situacaoCadastral: {
    type: String
  },
  ocorrenciaFiscal: {
    type: String
  },
  tipoUnidade: {
    type: String
  },
  dtInicioIE: {
    type: String
  },
  dtInicioSituacao: {
    type: String
  },
  formasAtuacao: {
    type: String
  },
  carga: {
    type: String
  },
  mes: {
    type: String
  },
  ano: {
    type: String
  },
  ato: {
    type: String
  },
  diaDoAto: {
    type: String
  },
  mesDoAto: {
    type: String
  },
  anoDoAto: {
    type: String
  },
  livro: {
    type: String
  },
  complementoLivro: {
    type: String
  },
  folha: {
    type: String
  },
  complementoFolha: {
    type: String
  },
  cartorio: {
    type: String
  },
  pessoas: {
    type: Array
  },
  infocrimPathPdf: {
    type: String
  },
  cartregistro: {
    type: String
  },
  cns: {
    type: String
  },
  nome1: {
    type: String
  },
  nvnome1: {
    type: String
  },
  nome2: {
    type: String
  },
  nvnome2: {
    type: String
  },
  dataCasamento: {
    type: String
  },
  matricula: {
    type: String
  },
  dataEntrada: {
    type: String
  },
  dataRegistro: {
    type: String
  },
  acervo: {
    type: String
  },
  nlivro: {
    type: String
  },
  nfolha: {
    type: String
  },
  nregistro: {
    type: String
  },
  tipolivro: {
    type: String
  },
  autorizado_responsavel: {
    type: Array
  },
  empresa: {
    type: Array
  },
  trabalhador: {
    type: Array
  },
  detranPathPdf: {
    type: Array
  },
  detranPathImg: {
    type: String
  }
})

moongose.model('relatorioModel', relatorioSchema)
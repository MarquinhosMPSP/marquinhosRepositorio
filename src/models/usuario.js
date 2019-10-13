const mongoose = require("mongoose");
const moment = require("moment");

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: String,
    default: moment()
      .utcOffset("-0300")
      .toDate()
  }
});

mongoose.model("usuarioModel", usuarioSchema);

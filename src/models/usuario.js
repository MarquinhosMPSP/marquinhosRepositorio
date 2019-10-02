const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
    },
    senha:{
        type: String,
        required: true,
    },
    cpf:{
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

mongoose.model('usuarioModel', usuarioSchema );
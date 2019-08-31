const mongoose = require('mongoose');
const Usuario = mongoose.model('usuarioModel');

module.exports = {
    async index(req, res){
        const usuarios = await Usuario.find();
        return res.json(usuarios);
    },
    async cadastro(req, res){
        const usuario = await Usuario.create(req.body);
        return res.json(usuario);
    },
    async pesquisar(req, res){
        const usuario = await Usuario.findById(req.params.id);
        return res.json(usuario);
    },
    async atualizar(req, res){
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(usuario);
    },
    async excluir(req, res){
        await Usuario.findByIdAndRemove(req.params.id);
        return res.send('usuário deletado com sucesso');
    }

}
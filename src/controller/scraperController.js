const scraper = require("../core/index");

module.exports = {
  async gerar(req, res) {
    const usuario = req.params.usuario;
    const ownerSocket = req.connectedUsers[usuario];
    scraper
      .run(usuario)
      .then(data => {
        console.log("finalizou");

        if (ownerSocket) {
          console.log("retornando dados...");

          req.io.to(ownerSocket).emit("report", data);
        }
      })
      .catch(err => {
        if (ownerSocket) {
          req.io
            .to(ownerSocket)
            .emit("report", { message: "Erro ao gerar relatório" });
        }
      });

    return res.status(200).json({ message: "Gerando relatório..." });
  }
};

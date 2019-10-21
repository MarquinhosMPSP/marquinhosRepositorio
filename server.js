const express = require("express");
const mongoose = require("mongoose");
const consign = require("consign");
const cors = require("cors");

//iniciando e configurando o app e o WS
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3001;

global.__filesPath = __dirname + "/PDFsAndImages";

//configurando o express para usar JSON e liberar o CORS
app.use(express.json());
app.use(cors());
app.use("/static", express.static(__dirname + "/PDFsAndImages"));

//iniciando o DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/nodeapi",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

let connectedUsers = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

//iniciando o autoload
consign()
  .include("./src/models")
  .then("./src/controller")
  .then("./src/routes")
  .into(app);

//rodando o servidor
server.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});

module.exports = app;

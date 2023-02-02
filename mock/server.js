const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const  response  = require("./response.mock");

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/sport/futebol/proximas-3-horas/", async (req, res) => {
  console.log(response);
  res.json(response);
});

server.get("/sport/futebol/proximas-12-horas/", async (req, res) => {
  console.log(response);
  res.json(response);
});

server.get("/sport/futebol/proximas-24-horas/", async (req, res) => {
  console.log(response);
  res.json(response);
});

server.use(router);
server.listen(3004, () => {
  console.log("JSON Server is running");
});

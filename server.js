const express = require("express");
const cors = require("cors");

const usersRouter = require("./data/helpers/routers/usersRouter.js");
const postsRouter = require("./data/helpers/routers/postsRouter.js");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send("<3");
});

module.exports = server;

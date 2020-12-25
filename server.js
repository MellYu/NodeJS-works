const express = require("express");
const cors = require("cors");
const userRouter = require("./users/userRoutes");
const PORT = 3030;

module.exports = class UserServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer(),
      this.initMiddlewares(),
      this.initRoutes(),
      this.startListening();
  }

  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "http://localhost:3030" }));
  }
  initRoutes() {
    this.server.use("/users", userRouter);
  }
  startListening() {
    this.server.listen(PORT, () => {
      console.log("Server is listening on Port", PORT);
    });
  }
};

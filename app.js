const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const contactRouter = require("./contacts/contacts.router");

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const MONGO_URL = `mongodb+srv://Yurii:${DB_PASSWORD}@homework-03.8igbn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 3000;

let server;

start();

function start() {
  initServer();
  initMiddlewares();
  declareRoutes();
  connectDatabase();
  listen();
}

function initServer() {
  server = express();
}

function initMiddlewares() {
  server.use(express.json());
  server.use(cors());
  server.use(morgan("dev"));
}

function declareRoutes() {
  server.use("/contacts", contactRouter);
}

async function connectDatabase() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

function listen() {
  server.listen(PORT, () => {
    console.log("Server is listening on port : ", PORT);
  });
}

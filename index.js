const express = require('express');
const mongoose = require('mongoose');
const fs = require("fs");

const {logReqRes} = require('./middlewares');
const {connectMongoDb} = require('./connection');
const userRouter = require('./routes/user');

const app = express();
const PORT = 8005;

connectMongoDb('mongodb://127.0.0.1:27017/project-01').then( () => {
  console.log("MongoDb connected!")
}
);

app.use(logReqRes('log.txt'));

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log("Server has started"));
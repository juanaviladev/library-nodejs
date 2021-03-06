"use strict"

const express = require('express');
const logger = require('morgan');
const config = require("./config");
const url = `mongodb://${config.dbConfig.host}:${config.dbConfig.databaseServerPort}/${config.dbConfig.database}`;
const server = express();
const mongoose = require("mongoose");
const database = mongoose.connection;

mongoose.connect(
    url,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter")

server.use(logger(config.logging));
server.use(express.json());

server.use('/api', userRouter);
server.use('/api', bookRouter);

server.use(middlewareNotFound);
server.use(middlewareServerError);

function middlewareNotFound(request, response) {
    response.status(404);
    response.json({
        message: `${request.url} not found`
    });
}

function middlewareServerError(error, request, response, next) {
    response.status(500);
    response.json(error);
}

database.on("error", function () {
    console.error("Error al conectar con la bd");
});

database.once("open", () => {
    server.listen(config.port, err => {
        if (err)
            console.error(`No se ha podido iniciar el servidor: ${err.message}`)
        else
            console.log(`Servidor arrancado en el puerto ${config.port}`)
    });
});

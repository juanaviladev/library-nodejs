"use strict"

const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController.js");

userRouter.get("/users", userController.getUsers);

userRouter.get("/users/:id", userController.getUser);

userRouter.post("/users", userController.saveUser);

userRouter.post("/users/:id/update", userController.updateUserEmail);

userRouter.delete("/users");

module.exports = userRouter;
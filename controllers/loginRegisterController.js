"use strict"

const User = require("../models/user");

async function login(request, response) {
    // login
    const nick = request.body.nick;
    const password = request.body.password;
    let user = await User.findOne({nick, password});
    if (user == null) {
        response.status(400);
        response.json({message: `Authentication error, check nick or password`});
        return;
    }
    request.user = user._id; // loged
    response.status(200);
    response.location(`${request.baseUrl + request.path}/${user._id}`);
    response.json();
}

async function register(request, response) {
    // register
    const nick = request.body.nick;
    const password = request.body.password;
    let user = await User.findOne({nick});
    if (user != null) {
        response.status(409);
        response.json({message: `User with nick '${nick}' already exists`});
        return;
    }

    user = await new User({
        nick: request.body.nick,
        email: request.body.email,
        password: password
    }).save();

    response.status(201);
    response.location(`${request.baseUrl + request.path}/${user._id}`);
    response.json();
}

module.exports = {
    login,
    register
}
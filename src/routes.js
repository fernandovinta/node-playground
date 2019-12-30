const express = require('express');
const authMiddleware = require("./middlewares/auth");

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

routes.use(authMiddleware).get("/user", UserController.show);

module.exports = routes;

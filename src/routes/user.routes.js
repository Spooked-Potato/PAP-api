/**
 * Arquivo dos endpoints relacionados aos utilizadores
 */
const express = require('express')
const routes = express.Router()

const UserController = require('../controllers/UserController')
const AuthService = require('../services/AuthService')

const user = new UserController();
const authService = new AuthService();

routes.post('/', user.create)
routes.get('/', user.show)
routes.delete('/:id', user.destroy)
routes.put('/:id', user.update)

module.exports = routes
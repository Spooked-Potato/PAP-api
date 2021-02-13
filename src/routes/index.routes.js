const express = require('express')
const routes = express.Router()

const AuthController = require('../controllers/AuthenticationController')
const authController = new AuthController();

routes.post('/login', authController.login)

module.exports = routes
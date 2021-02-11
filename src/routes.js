const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const AuthController = require('./controllers/AuthenticationController')
const AuthService = require('./services/AuthService')

const user = new UserController();
const authController = new AuthController();
const authService = new AuthService();


routes.get('/', (request, response) => {
  return response.send('hello world')
})




routes.post('/login', authController.login)

routes.post('/users', user.create)
routes.get('/users', user.show)
routes.delete('/users/:id', user.destroy)
routes.put('/users/:id', user.update)

module.exports = routes
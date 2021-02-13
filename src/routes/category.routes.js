const express = require('express')
const routes = express.Router()

const CategoryController = require('../controllers/CategoryController')
const AuthService = require('../services/AuthService')

const category = new CategoryController();
const authService = new AuthService();

routes.get('/', category.show)

//rotas para admin
routes.post('/', authService.verifyToken, category.create)
routes.delete('/:id', authService.verifyToken, category.destroy)
routes.put('/:id', authService.verifyToken, category.update)

module.exports = routes
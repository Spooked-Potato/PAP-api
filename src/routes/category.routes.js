const express = require('express')
const routes = express.Router()

const CategoryController = require('../controllers/CategoryController')
const AuthService = require('../services/AuthService')

const category = new CategoryController();
const authService = new AuthService();

routes.get('/', category.show)
routes.post('/', category.create)
routes.delete('/:id', category.destroy)
routes.put('/:id', category.update)


module.exports = routes
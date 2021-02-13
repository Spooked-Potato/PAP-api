const express = require('express')
const routes = express.Router()
const multer = require("multer");
const multerConfig = require('../config/multer');

const BrandController = require('../controllers/BrandController')
const AuthService = require('../services/AuthService')

const brand = new BrandController();
const authService = new AuthService();

const upload = multer(multerConfig);

routes.get('/', brand.show)

//rotas para admin
routes.post('/', authService.verifyToken, upload.single('image'), brand.create)
routes.delete('/:id', authService.verifyToken, brand.destroy)
routes.put('/:id', authService.verifyToken, upload.single('image'), brand.update)

module.exports = routes
/**
 * Arquivo principal de criação do servidor
 */

const express = require('express')
const cors = require('cors')
const path = require('path')

const routes = require('./routes/index.routes')
const UserRoutes = require('./routes/user.routes')
const CategoriesRoutes = require('./routes/category.routes')
const BrandsRoutes = require('./routes/brand.routes')

const dotenv = require('dotenv')

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use('/users', UserRoutes)
app.use('/categories', CategoriesRoutes)
app.use('/brands', BrandsRoutes)

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333, console.log('Server on 🔥'))
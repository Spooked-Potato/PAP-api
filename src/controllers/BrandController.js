const path = require("path")
const connPath = path.resolve(__dirname, "..", "database", "connection.js")
const knex = require(connPath)

const UpperName = require("../utils/upperName")
const CheckAdminRole = require("../utils/checkAdminRole")

class BrandController {
  async create(request, response) {
    try {

      const token = request.header('authentication')

      const isAdmin = new CheckAdminRole().checkRole(token)

      if (isAdmin === false) return response.status(403).json({
        message: 'Access denied! Only admins!!!'
      })

      const {
        name
      } = request.body

      const upperName = new UpperName().upperName(name)

      const brandExists = await knex('Brand').where('name', name).select('id').first()

      if (brandExists) return response.status(400).json({
        message: 'Brand already exists!'
      })

      console.log(request.file)

      const brand = {
        name: upperName,
        image: request.file.filename
      }

      await knex('Brand').insert(brand)

      return response.sendStatus(201)
    } catch (e) {
      return response.json({
        message: e.message
      })
    }
  }

  async show(request, response) {

    try {
      const brands = await knex('Brand').select('name')

      return response.status(200).send(brands)

    } catch (e) {
      return response.json({
        message: e.message
      })
    }

  }

  async update(request, response) {
    try {

      const token = request.header('authentication')

      const isAdmin = new CheckAdminRole().checkRole(token)

      if (isAdmin === false) return response.status(403).json({
        message: 'Access denied! Only admins!!!'
      })

      const {
        id
      } = request.params

      const {
        name
      } = request.body

      const {
        image
      } = request.file.filename

      const brand = await knex('Brand').where('id', id).first()

      if (!brand) {
        return response.status(404).json({
          message: 'Brand not found!'
        })
      }

      if (!name && !image) {
        return response.status(404).json({
          message: 'Invalid data!'
        })
      }

      if (name) {
        const upperName = new UpperName().upperName(name)
        await knex('Brand').where('id', id).update('name', upperName)
      }

      if (image) {
        await knex('Brand').where('id', id).update('image', image)
      }

      return response.status(200).json({
        message: 'Brand updated successfully!'
      })

    } catch (e) {
      return response.json({
        message: e.message
      })
    }

  }

  async destroy(request, response) {
    try {
      const token = request.header('authentication')

      const isAdmin = new CheckAdminRole().checkRole(token)

      if (isAdmin === false) return response.status(403).json({
        message: 'Access denied! Only admins!!!'
      })

      const {
        id
      } = request.params

      const brand = await knex('Brand').where('id', id).select('id').first()

      if (!brand) {
        return response.status(404).send({
          message: 'Brand not found!'
        })
      }

      await knex('brand').where('id', id).delete()

      return response.sendStatus(204)

    } catch (e) {
      return response.json({
        message: e.message
      })
    }
  }
}

module.exports = BrandController
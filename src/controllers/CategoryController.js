const path = require("path")
const connPath = path.resolve(__dirname, "..", "database", "connection.js")
const knex = require(connPath)

const UpperName = require("../utils/upperName")
const CheckAdminRole = require("../utils/checkAdminRole")

class CategoryController {
  /**
   * Criar uma categoria nova no sistema
   * @param {*} request 
   * @param {*} response 
   * @returns Código de sucesso ou uma mensagem de erro
   */
  async create(request, response) {
    try {
      const token = request.header('authentication')

      const isAdmin = new CheckAdminRole().checkRole(token)

      if (isAdmin === false) return response.status(403).json({
        message: 'Access denied! Only admins!!!'
      })

      const {
        name,
        description
      } = request.body


      const categoryExists = await knex('Category').where('name', name).select('id').first()

      if (categoryExists) return response.status(400).json({
        message: 'Category already exists!'
      })

      const upperName = new UpperName().upperName(name)

      await knex('Category').insert({
        name: upperName,
        description
      })

      return response.sendStatus(201)
    } catch (e) {
      return response.status(500).json({
        message: e.message
      })
    }
  }

  /**
   * Listar todas as categorias existentes
   * @param {*} request 
   * @param {*} response 
   * @returns Lista com todas as categorias ou uma mensagem de erro
   */
  async show(request, response) {
    try {
      const categories = await knex('Category').select('*')

      return response.status(200).send(categories)
    } catch (e) {
      return response.status(500).json({
        message: e.message
      })
    }
  }

  /**
   * Atualizar os dados de uma categoria
   * @param {*} request 
   * @param {*} response 
   * @returns Mensagem de sucesso ou mensagem de erro
   */
  async update(request, response) {
    try {
      const token = request.header('authentication')

      const isAdmin = new CheckAdminRole().checkRole(token)

      if (isAdmin === false) return response.status(403).json({
        message: 'Access denied! Only admins!!! Only admins!!!'
      })

      const {
        id,
      } = request.params

      const {
        name,
        description
      } = request.body

      const category = await knex('Category').where('id', id).first()

      if (!category) {
        return response.status(404).json({
          message: 'Category not found!'
        })
      }

      if (!name && !description) {
        return response.status(404).json({
          message: 'Invalid data!'
        })
      }

      if (name) {
        const upperName = new UpperName().upperName(name)
        await knex('Category').where('id', id).update('name', upperName)
      }

      if (description) {
        await knex('Category').where('id', id).update('description', description)
      }

      return response.status(200).json({
        message: 'Category updated successfully!'
      })
    } catch (e) {
      return response.json({
        message: e.message
      })
    }
  }

  /**
   * Apagar uma categoria
   * @param {*} request 
   * @param {*} response 
   * @returns Código de sucesso ou mensagem de erro
   */
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

      const category = await knex('Category').where('id', id).select('id').first()

      if (!category) {
        return response.status(404).send({
          message: 'Category not found!'
        })
      }

      await knex('category').where('id', id).delete()

      return response.sendStatus(204)
    } catch (e) {
      return response.json({
        message: e.message
      })
    }
  }
}

module.exports = CategoryController;
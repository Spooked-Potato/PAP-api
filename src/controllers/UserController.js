const path = require("path")
const connPath = path.resolve(__dirname, "..", "database", "connection.js")
const knex = require(connPath)

const AuthService = require('../services/AuthService')


class UserController {
  async create(request, response) {
    try {
      const {
        username,
        password,
        email,
        gender,
        admin
      } = request.body;

      const emailExists = await knex('Users').where('email', email).select('id').first()

      if (emailExists) return response.status(400).json({
        message: 'Email already exists!'
      })

      const hashedpw = await AuthService.hashPW(password);

      await knex('Users').insert({
        username,
        password: hashedpw,
        email,
        gender,
        admin
      })

      return response.sendStatus(201)
    } catch (e) {
      return response.json({
        message: e.message
      })
    }
  }

  async show(request, response) {
    try {
      const users = await knex('Users').select('*')

      return response.send(users)
    } catch (e) {
      return response.json({
        message: e.message
      })
    }
  }

  async destroy(request, response) {
    try {
      const {
        id
      } = request.params

      const user = await knex('Users').where('id', id).select('id').first()

      if (!user) {
        return response.status(404).send({
          message: 'User not found!'
        })
      }

      await knex('Users').where('id', id).delete()

      return response.sendStatus(204)
    } catch (e) {
      return response.json({
        message: e.message
      })
    }
  }

  async update(request, response) {
    try {
      const {
        id,

      } = request.params

      const {
        username,
        password
      } = request.body

      const user = await knex('Users').where('id', id).first()

      if (!user) {
        return response.status(404).json({
          message: 'User not found!'
        })
      }

      if (!username && !password) {
        return response.status(404).json({
          message: 'Invalid data!'
        })
      }

      if (username) {
        await knex('Users').where('id', id).update('username', username)
      }

      if (password) {
        const hashedpw = await AuthService.hashPW(password);
        await knex('Users').where('id', id).update('password', hashedpw)
      }

      return response.status(200).json({
        message: 'User updated successfully!'
      })
    } catch (e) {
      return response.json({
        message: e.message
      })
    }
  }
}
module.exports = UserController
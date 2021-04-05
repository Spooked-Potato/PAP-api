const path = require("path")
const connPath = path.resolve(__dirname, "..", "database", "connection.js")
const knex = require(connPath)

const AuthService = require('../services/AuthService')

class CheckAdminRole {
  /**
   * Verificar se o user logado tem role de admin
   * @param {string} token 
   * @returns 
   */
  checkRole(token) {
    const user = new AuthService().decodeToken(token)

    const loggedUser = JSON.parse(JSON.stringify(user))

    return loggedUser.admin === 1 ? true : false
  }
}

module.exports = CheckAdminRole;
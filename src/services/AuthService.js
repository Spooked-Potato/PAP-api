const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor() {}

  /**
   * Encriptar a password
   * @param {string} pw 
   * @param {number} salt 
   * @returns password encriptada
   */
  static async hashPW(pw, salt = 10) {
    return await bcrypt.hash(pw, salt)
  }

  /**
   * Comparar se a password inserida é igual a encriptada ja exigente no sistema
   * @param {string} originalPW 
   * @param {string} hashedPW 
   * @returns true or false
   */
  static async comparePW(originalPW, hashedPW) {
    return await bcrypt.compare(originalPW, hashedPW)
  }

  /**
   * Criar um token de acesso
   * @param {object} user 
   * @returns token
   */
  static generateToken(user) {
    return jwt.sign({
      id: user.id,
      username: user.username,
      admin: user.admin
    }, process.env.TOKEN, {
      expiresIn: process.env.EXPIRE_TIME
    })
  }

  /**
   * Decifrar o token
   * @param {string} token 
   * @returns 
   */
  decodeToken(token) {
    return jwt.verify(token, process.env.TOKEN)
  }

  /**
   * Check if user is authenticated
   * @param {*} request 
   * @param {*} response 
   * @param {*} next 
   * @returns 
   */
  verifyToken(request, response, next) {
    const token = request.header('authentication')

    if (!token)
      return response.status(401).json({
        message: "Access Denied!"
      })

    try {
      const aux = new AuthService()
      const decodedToken = aux.decodeToken(token)
      response.locals.token = decodedToken

      next()
    } catch (error) {
      return response.status(401).json({
        message: 'Invalid Token!'
      })
    }
  }
}

module.exports = AuthService
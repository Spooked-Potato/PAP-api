const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor() {}

  static async hashPW(pw, salt = 10) {
    return await bcrypt.hash(pw, salt)
  }

  static async comparePW(originalPW, hashedPW) {
    return await bcrypt.compare(originalPW, hashedPW)
  }

  static generateToken(user) {
    return jwt.sign({
      id: user.id,
      username: user.username
    }, process.env.TOKEN, {
      expiresIn: process.env.EXPIRE_TIME
    })
  }

  decodeToken(token) {
    return jwt.verify(token, process.env.TOKEN)
  }

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
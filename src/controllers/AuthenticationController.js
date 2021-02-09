const AuthService = require('../services/AuthService')
const knex = require('../database/connection')

class AuthenticationController {
  async login(request, response) {
    try {

      const {
        username,
        password
      } = request.body;

      const user = await knex('users').where('username', username).first()

      if (!user)
        return response.json({
          code: 401,
          message: 'User not found!',
        });

      if (!(await AuthService.comparePW(password, user.password))) {
        return response.json({
          code: 401,
          message: 'Incorrect Password',
        });
      }

      const auxUser = {
        id: user.id,
        username: user.username
      }

      const token = AuthService.generateToken(auxUser);

      return response.header('authentication', token).send(token);
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = AuthenticationController
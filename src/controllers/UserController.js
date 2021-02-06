const path= require("path")
const connPath=path.resolve(__dirname, "..", "database", "connection.js")
const knex = require(connPath)

module.exports = {
  async create(request, response){
    try{
      //melhorar com as verificacoes necessarias
      const {
        username,
        password,
        email,
        gender,
        admin
      } = request.body;
  
      const [id]= await knex('Users').insert({
        username,
        password,
        email,
        gender,
        admin
      })
  
      return response.sendStatus(201)
    }catch(e){
      return response.json({message:e.message})
    }
  },

  async show(request, response){
    try{
      const users= await knex('Users').select('*')

      return response.send(users)
    }catch(e){
      return response.json({message:e.message})
    }
  },

  async destroy(request, response){
    try {
      const {id} = request.params

      const user= await knex('Users').where('id', id).select('id').first()

      if(!user){
        return response.status(404).send({
          message:'User not found'
        })
      }

      await knex('Users').where('id', id).delete()

      return response.sendStatus(204)
    } catch (e) {
      return response.json({message:e.message})
    }
  }
}
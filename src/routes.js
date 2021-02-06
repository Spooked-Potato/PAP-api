const express= require('express')

const routes= express.Router()

const userController= require('./controllers/UserController')

routes.get('/', (request, response)=>{
  return response.send('hellow horld')
})

routes.post('/users', userController.create)
routes.get('/users', userController.show)
routes.delete('/users/:id', userController.destroy)

module.exports=routes 
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makePizzaArray } = require('./yourpizza.fixtures')

describe('YourPizza and Category Endpoints', function(){
   let db 

   before('make knex instance',() =>{
      db = knex({
         client: 'pg',
         connection: process.env.DATABASE_URL,
      })
      app.set('db',db)
   })

   after('disconnect from db', () => db.destroy())

   before('clean the table', () => db('yourpizza').truncate())

   afterEach('cleanup', () => db('yourpizza').truncate())


   //Category Endpoint
   describe('GET /api/category', () => {
      context(`Given there are categories`, () => {
         it('responds with 200', () => {
            return supertest(app)
            .get('/api/category')
            .expect(200)
         })
      })
   })

   //YourPizza Endpoint

   describe(`GET /api/yourpizza`, () => {
      context('Given no pizzas', () => {
         it(`responds with 200 and an empty list`, () => {
            return supertest(app)
            .get('/api/yourpizza')
            .expect(200,[])
         })
      })
   })

   describe(`POST /api/yourpizza`, () => {
      const requiredFields = ['crust', 'cheese', 'sauce', 'meats', 'toppings', 'category_id']

      requiredFields.forEach(field => {
      const newPizza = {
      "crust":"test",
      "cheese":"test",
      "sauce":"test",
      "meats":"test",
      "toppings":"test",
      "category_id":1,
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
      delete newPizza[field]

      return supertest(app)
          .post('/api/yourpizza')
          .send(newPizza)
          .expect(400, {
          error: { message: `Missing '${field}' in request body` }
          })
      })
      }) 
  })

  describe(`PATCH /api/yourpizza/:pizza_id`, () => {
   context('Given there are pizzas in the database', () => {
       const testPizzas = makePizzaArray()
   
       beforeEach('insert pizza', () => {
          return db
           .into('yourpizza')
           .insert(testPizzas)
       })
   
       it(`responds with 400 when no required fields supplied`, () => {
           const idToUpdate = 2
           return supertest(app)
           .patch(`/api/yourpizza/${idToUpdate}`)
           .send({ irrelevantField: 'foo' })
           .expect(400, {
               error: {
                   message: "Request body must contain either 'crust', 'cheese', 'category', 'toppings', 'sauce', or 'meats'"
               }
           })
       })
   })
}) 
describe(`Delete /api/yourpizza/:pizza_id`, () => {
   // context(`Given no sightings`, () => {

   //    })
   context('Given there are pizzas in the database', () => {
      const testPizzas = makePizzaArray()

   beforeEach('insert pizzas', () => {
      return db
         .into('yourpizza')
         .insert(testPizzas)
         })

   it('responds with 204 and removes the pizza', () => {
         const idToRemove = 2
         const expectedPizza = testPizzas.filter(pizza => pizza.id !== idToRemove)
         return supertest(app)
         .delete(`/api/yourpizza/${idToRemove}`)
         .expect(204)
         .then(res =>
            supertest(app)
               .get(`/api/yourpizza`)
               .expect(expectedPizza)
            )
      })
   })  
})








})
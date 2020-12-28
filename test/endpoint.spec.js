const knex = require('knex')
const { Connection } = require('pg')
const supertest = require('supertest')
const app = require('../src/app')


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







})
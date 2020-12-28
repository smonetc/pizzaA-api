const path = require('path')
const express = require('express')
const YourPizzaService = require('./yourpizza-service')

const yourpizzaRouter = express.Router()
const jsonParser = express.json()

const serializeYourPizza = pizza => ({
   id: pizza.id,
   crust: pizza.crust,
   cheese: pizza.cheese,
   sauce: pizza.sauce,
   meats: pizza.meats,
   toppings: pizza.toppings,
   content: pizza.content,
   username: pizza.username
})

yourpizzaRouter
.route('/')
.get((req,res,next) => {
   YourPizzaService.getAllYourPizza(req.app.get('db'))
    .then(pizza => {
        res.json(pizza.rows.map(serializeYourPizza))
    })
    .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const {crust,cheese,sauce,meats,toppings,category_id, username} = req.body
    const newYourPizza = {crust,cheese,sauce,meats,toppings,category_id}

    for (const [key, value] of Object.entries(newYourPizza)) {
        if (value == null) {
            return res.status(400).json ({
                error: {message: `Missing '${key}' in request body`}
            })
        }
    }

    newYourPizza.username = username
    YourPizzaService.insertYourPizza(
        req.app.get('db'),
        newYourPizza
    )
    .then( pizza => {
        res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${pizza.id}`))
        .json(serializeYourPizza(pizza))
    })
    .catch(next)
})

yourpizzaRouter
.route('/:pizza_id')
.all( (req, res, next) => {
    YourPizzaService.getById(
        req.app.get('db'),
        req.params.pizza_id
    )
    .then(pizza => {
        if (!pizza){
            return res.status(400).json({
                error: {message: `Pizza not found`}
            })
        }
        res.pizza = pizza
        next()
    })
    .catch(next)
})
.get((req,res,next) => {
    res.json(
        {
            id: res.pizza.id,
            crust: res.pizza.crust,
            cheese: res.pizza.cheese,
            sauce: res.pizza.sauce,
            meats: res.pizza.meats,
            toppings: res.pizza.toppings,
            content: res.pizza.content, //category_id
            username: res.pizza.username
        }
    )
})
.patch(jsonParser, (req,res,next) => {
    const {crust,cheese,sauce,meats,toppings,category_id} = req.body
    const pizzaToUpdate = {crust,cheese,sauce,meats,toppings,category_id}

    const numberOfValues = Object.values(pizzaToUpdate).filter(Boolean).length

    if (numberOfValues === 0) {
        return res.status(400).json({
        error: {
        message: `Request body must contain either 'crust', 'cheese', 'category', 'toppings', 'sauce', or 'meats'`}
      })
    }

   YourPizzaService.updateYourPizza(
        req.app.get('db'),
        req.params.pizza_id,
        pizzaToUpdate
    )
    .then(()=> {
        res.status(204).end()
    })
    .catch(next)
})
.delete((req, res, next) => {
    YourPizzaService.deleteYourPizza(
        req.app.get('db'),
        req.params.pizza_id
    )
    .then(() => {
        res.status(204).end()
    })
    .catch(next)
})

module.exports = yourpizzaRouter
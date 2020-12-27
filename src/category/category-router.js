const path = require('path')
const express = require('express')
const CategoryService = require('./category-service')

const categoryRouter = express.Router()
const jsonParser = express.json()

const serializeCategory = category => ({
   id: category.id,
   content: category.content,
})

categoryRouter
.route('/')
.get((req,res,next) => {
   CategoryService.getAllCategory(req.app.get('db'))
   .then(c => {
      res.json(c.map(serializeCategory))
   })
   .catch(next)
})
.post(jsonParser, (req,res,next) => {
   const {content} = req.body
   const newCategory = {content}

   for (const [key,value] of Object.entries(newCategory)){
      if(value == null) {
         return res.status(400).json({
            error: {message: `Missing '${key}' in request body`}
         })
      }
   }

   newCategory.content = content
   CategoryService.insertCategory(
      req.app.get('db'),
      newCategory
   )
   .then(category => {
      res
      .status(201)
      .location(path.posix.join(req.originalUrl, `/${category.id}`))
      .json(serializeCategory(category))
   })
   .catch(next)
})

categoryRouter
.route('/:category_id')
.all((req,res,next) => {
   CategoryService.getById(
      req.app.get('db'),
      req.params.category_id
   )
   .then(category => {
      if(!category){
         return res.status(400).json({
            error: {message: `Category doesn't exist`}
         })
      }
      res.category = category
      next()
   })
   .catch(next)
})

.get((req,res,next) => {
   res.json({
      id: res.category.id,
      content: res.category.content,
   })
})
.patch(jsonParser, (req,res,next) => {
   const {content} = req.body
   const categoryToUpdate = {content}

   const numberOfValues = Object.values(categoryToUpdate).filter(Boolean).length

   if(numberOfValues === 0){
      return res.status(400).json({
         error:{message:`Request body must contain some 'content'`}
      })
   }
   CategoryService.updateCategory(
      req.app.get('db'),
      req.params.category_id,
      categoryToUpdate
   )
   .then(numRowsAffected =>{
      res.status(204).end()
   })
   .catch(next)
})
.delete((req,res,next) => {
   CategoryService.deleteCategory(
     req.app.get('db'),
     req.params.category_id 
   )
   .then(()=>{
      res.status(204).end()
   })
   .catch(next)
})

module.exports = categoryRouter
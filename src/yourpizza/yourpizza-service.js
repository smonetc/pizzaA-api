const YourPizzaService = {
   getAllYourPizza(knex){
       return knex
       .raw(`SELECT p.id, p.crust, p.cheese, p.sauce, p.meats, p.toppings, p.username, category.content FROM yourpizza p 
       LEFT JOIN category ON p.category_id = category.id ORDER BY p.id`)
   },
   insertYourPizza(knex, newYourPizza) {
       return knex
       .into('yourpizza')
       .insert(newYourPizza, ['*'])
       .then(rows => {
           return rows[0]
       })
     },
   getById(knex, id) {
       return knex
       .from('yourpizza')
       .select('*')
       .where('id', id)
       .first()
   },
   deleteYourPizza(knex, id) {
      return knex('yourpizza')
       .where({ id })
       .delete()
   },
   updateYourPizza(knex, id, newYourPizzaFields) {
       return knex('yourpizza')
       .where({ id })
       .update(newYourPizzaFields)
   },
}
module.exports = YourPizzaService



function makePizzaArray() {
   return [
       {
           "id":1,
           "crust":"Thin Crust",
           "cheese":"Regular Cheese",
           "sauce":"Marinara",
           "category_id": 1,
           "meats":"Pepperoni",
           "toppings":"Onions",
           "username":"Jimmy"
       },
       {
         "id":2,
         "crust":"Thin Crust",
         "cheese":"Regular Cheese",
         "sauce":"Alfredo",
         "category_id": 1,
         "meats":"Chicken",
         "toppings":"Onions and Pepper",
         "username":"Tara"
       }
   ];
 }

 module.exports = {
   makePizzaArray
 }
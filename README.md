# Pizza Anonymous API!

This is the API for my Pizza Anonymous react website!
There are two tables and two endpoints for both the categories and for the pizza creations. 

All endpoints follow CRUD:
In the project Category only utilizes Get and Get by ID - examples for both are provided
In the project YourPizza only utilizes Get and Post - examples for both are provided

# Category

### Show all categories

* URL

/api/category

* Method:

GET

* URL Params

None

* DATA Params

None

* Success Response:
   * Code: 200
      * Content: {"id":1,"content":"Savory"}

* Error Response:
   * Code: 404 NOT FOUND  
      * Content: "error": {"message": "Category not found"}

### Get Specific Category

* URL

/api/category/id

* Method

GET

* URL Params

id=[integer]

* DATA Params

None

* Success Response: 
   * Code: 200
      * Content: {"id":1,"content":"Savory"}
* Error Response:
   * Code: 404 Not Found
      * Content: error: {message: `Category not found`}

# YourPizza

### Show all pizzas
* URL

/api/yourpizza

* Method

GET

* URL Params

None

* DATA Params

None

* Success Response: 
   * Code: 200
      * Content: {
         "id":1,
         "crust":"Thin Crust",
         "cheese":"Regular Cheese",
         "sauce":"Marinara",
         "category_id": 1,
         "meats":"Pepperoni",
         "toppings":"Onions",
         "username":"Jimmy"
         }
* Error Response:
   * Code: 404 Not Found
      * Content: error: {message: `Pizza not found`}

### Post new pizza

* URL

/api/yourpizza

* Method

POST

* URL Params

None

* DATA Params

{ crust, cheese, sauce, meats, toppings, category_id, username}

* Success Response: 
   * Code: 200
      * Content: {
         "id":2,
         "crust":"Thin Crust",
         "cheese":"Regular Cheese",
         "sauce":"Marinara",
         "category_id": 1,
         "meats":"Pepperoni",
         "toppings":"Onions",
         "username":"Jimmy"
         }
* Error Response:
   * Code: 404 Not Found
      * Content: error: {message: `Pizza not found`}
 
[Client Repo](https://github.com/smonetc/pizza-anonymous)
[Live Version](https://pizza-anonymous.smonetc.vercel.app/)


Tech used: Express, Node, Postgresql,knex,Chai
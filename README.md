# ShopStop-node.js

“Shop Stop” is very simple product catalog website (like OLX, Amazon – but simpler 😊). The application will consist of users, products and categories. Each user can register, login and logout. Users also can create, buy, edit or delete a product. Each product has a category in which it is specified. Site will implement of searching for a product by the product’s name or category.

Table of Contents
  Part I - Laying the Project Fundamentals (current)
  Part II – Using Third-Party Modules
  Part III – Defining Database Models and Relations
  Part IV – Advanced Functionality 
  Part V – User Authentication
  
Project Specification
Design and implement a “Shop Stop” web application (containing routing and multiple web pages) using HTML5, CSS3 and Node.js. It must contain the following functionality:

Functionality
  - User Login
  - Login in current application using username and password of already registered user.
  - User Register
  - Register a new user by providing username and password.
  - User Logout
  - Logouts from the application.
  - Product Create
  - Creates a new product, makes currently logged in user as it’s publisher.
  - Data must be saved in some sort of database.
  - Product Buy
  - Products may be bought by any user. One product could not be bought more than one time.
  - Product Edit
  - Edits product's information. Changes must be persisted in database.
  - Product Delete
  - Deletes specific product from database.
  - Category Create
  - Create a category which later on can be picked when a new product is created (uploaded).
  - Products by Name
  - List all products which name contains given text
  - Products by Category
  - List all products are in particular category (use the name of the category)

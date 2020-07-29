# E-Commerce CMS

E-Commerce CMS is an server-side / admin-side application to manage E-Commerce client-side. This app has:
* RESTful endpoint for Product CRUD Operation
* RESTful endpoint for User Login & Register Operation
* RESTful endpoint for Add Cart and Checkout Operation
* JSON Formated Response
* Used Technology : 
    - Express Js (Node JS Framework), 
    - Object-relation Mapping: Sequelize, 
    - Database: Postgres, 
    - Test Driven Development: Jest (JS Testing Framework)
    - Token Signing/Verification: Json Web Token, 
    - Password Encryption: Bcrypt


## RESTful endpoints

### Global endpoints

_Response (401 - Unauthorized)_
```
{
  "message": "Not authroized to do the actions"
}
```

_Response (500 - Error)_
```
{
  "message": "internal server error"
}
```


## Products Routes

### GET /products
> Get all products 

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": "<show id data>",
    "name": "<show name data>",
    "image_url": "<show image_url data>",
    "price": "<show price data>",
    "stock": "<show stock data>",
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>"
  },
  {
    "id": "<show id data>",
    "name": "<show name data>",
    "image_url": "<show image_url data>",
    "price": "<show price data>",
    "stock": "<show stock data>",
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>"
  }
]
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```


### GET /products/:id
> Get product base on selected id

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Parameter_
```
  "id": "<selected product id>"
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": "<show id by requested id>",
    "name": "<show name by requested id>",
    "image_url": "<show image_url by requested id>",
    "price": "<show price by requested id>",
    "stock": "<show stock by requested id>",
    "createdAt": "<show createdAt by requested id>",
    "updatedAt": "<show updatedAt by requested id>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

### POST /products
> Create new product

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Request Body_
```
{
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price get insert into>",
    "stock": "<stock get insert into>",
}
```

_Response (201)_
```
{
    "id": <given id by system>,
    "name": "<show name data>",
    "image_url": "<show image_url data>",
    "price": "<show price data>",
    "stock": "<show stock data>",
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>"
}
```

_Response (400 - Bad Request)_
```
{
  "message" : "name cannot be empty" || 
              "image_url cannot be empty" || 
              "price cannot be empty" || 
              "stock cannot be empty" || 
              "Price and Stock must be more then 0" || 
              "Price and Stock must be a Number"
}
```


### PUT /products/:id
> Update existing product base on selected id

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Request Parameter_
```
  "id": "<selected product id>"
```

_Request Body_
```
{
    "name": "<name to get update into>",
    "image_url": "<image_url to get update into>",
    "price": "<price to get update into>",
    "stock": "<price to get update into>",
}
```

_Response (200)_
```
{
    "id": "<id to get update into>",
    "name": "<name to get update into>",
    "image_url": "<image_url to get update into>",
    "price": "<price to get update into>",
    "stock": "<stock to get update into>",
    "createdAt": "<createdAt to get update into>",
    "updatedAt": "<updatedAt to get update into>"
}
```

_Response (400 - Bad Request)_
```
{
  "message" : "name cannot be empty" || 
              "image_url cannot be empty" || 
              "price cannot be empty" || 
              "stock cannot be empty" || 
              "Price and Stock must be more then 0" || 
              "Price and Stock must be a Number"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

### DELETE /products/:id
> Delete product base on selected id

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Request Parameter_
```
  "id": "<selected product id>"
```

_Response (200)_
```
{
    "id": "<contain id that deleted>",
    "name": "<contain name that deleted>",
    "image_url": "<contain image_url that deleted>",
    "price": "<contain price that deleted>",
    "stock": "<contain stock that deleted>",
    "createdAt": "<contain createdAt that deleted>",
    "updatedAt": "<contain updatedAt that deleted>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "please fill all fields"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```


## Carts Routes

### GET /carts
> Get all product on cart 

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": "<show cart id>",
    "UserId": "<show user id>",
    "ProductId": "<show product id>",
    "isPaid: "<show isPaid boolean data>",
    "qty: "<show quantity data>",
    "User": {
              "id": "<show user's id>",
              "email": "<show user's email>",
              "password": "<show user's encrypted password>",
              "role": "<show user's role>",
              "createdAt": "<show user's created date>",
              "updatedAt": "<show user's updated date>"
            },
    "Product": {
              "id": "<show product's id>",
              "name": "<show product's name>",
              "image_url": "<show product's image_url>",
              "price": "<show product's price>",
              "stock": "<show product's stock>",
              "createdAt": "<show product's createdAt>",
              "updatedAt": "<show product's updatedAtd>"
              },         
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>"
  },
  {
    "id": "<show cart's id>",
    "UserId": "<show user's id>",
    "ProductId": "<show product's id>",
    "isPaid: "<show isPaid boolean data>",
    "qty: "<show quantity data>",
    "User": {
              "id": "<show user's id>",
              "email": "<show user's email>",
              "password": "<show user's encrypted password>",
              "role": "<show user's role>",
              "createdAt": "<show user's created date>",
              "updatedAt": "<show user's updated date>"
            },
    "Product": {
              "id": "<show product's id>",
              "name": "<show product's name>",
              "image_url": "<show product's image_url>",
              "price": "<show product's price>",
              "stock": "<show product's stock>",
              "createdAt": "<show product's createdAt>",
              "updatedAt": "<show product's updatedAtd>"
              },         
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>"
  },
]
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

### GET /carts/transactionHist
> Get all item that had been checked out 

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": "<show cart id>",
    "UserId": "<show user id>",
    "ProductId": "<show product id>",
    "isPaid: "<show isPaid boolean data>",
    "qty: "<show quantity data>",
    "User": {
              "id": "<show user's id>",
              "email": "<show user's email>",
              "password": "<show user's encrypted password>",
              "role": "<show user's role>",
              "createdAt": "<show user's created date>",
              "updatedAt": "<show user's updated date>"
            },
    "Product": {
              "id": "<show product's id>",
              "name": "<show product's name>",
              "image_url": "<show product's image_url>",
              "price": "<show product's price>",
              "stock": "<show product's stock>",
              "createdAt": "<show product's createdAt>",
              "updatedAt": "<show product's updatedAtd>"
              },         
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>"
  },
  {
    "id": "<show cart's id>",
    "UserId": "<show user's id>",
    "ProductId": "<show product's id>",
    "isPaid: "<show isPaid boolean data>",
    "qty: "<show quantity data>",
    "User": {
              "id": "<show user's id>",
              "email": "<show user's email>",
              "password": "<show user's encrypted password>",
              "role": "<show user's role>",
              "createdAt": "<show user's created date>",
              "updatedAt": "<show user's updated date>"
            },
    "Product": {
              "id": "<show product's id>",
              "name": "<show product's name>",
              "image_url": "<show product's image_url>",
              "price": "<show product's price>",
              "stock": "<show product's stock>",
              "createdAt": "<show product's createdAt>",
              "updatedAt": "<show product's updatedAtd>"
              },         
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>"
  },
]
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

### POST /carts
> Create new carts item,

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Body_
```
{
  "ProductId": "<ProductId to get insert into>",
  "UserId": "<UserId to get insert into, get from access_token>",
}
```

_Response (201)_
```
{
  "id": <given id by system>,
  "ProductId": "<show ProductId data>",
  "UserId": "<show UserId data>",
  "isPaid: "<show isPaid boolean data>",
  "qty: "<show qty data>",
  "createdAt": "<show createdAt data>",
  "updatedAt": "<show updatedAt data>"
}
```

_Response (400 - Bad Request)_
```
{
  "message" : "ProductId cannot be empty"
}
```


### PUT /carts
> Update carts base on user id

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Parameter_
```
not needed
```

_Request Body_
```
{
  "ProductId": "<show ProductId data>",
  "UserId": "<show UserId data>",
  "isPaid: "<show isPaid boolean data>",
  "qty: "<show qty data>",
}
```

_Response (200)_
```
[
  {
    "id": <show id by system>,
    "ProductId": "<show ProductId data>",
    "UserId": "<show UserId data>",
    "isPaid: "<show isPaid boolean data>",
    "qty: "<show qty data>",
    "createdAt": "<createdAt to get update into>",
    "updatedAt": "<updatedAt to get update into>"
  },
  {
    "id": <show id by system>,
    "ProductId": "<show ProductId data>",
    "UserId": "<show UserId data>",
    "isPaid: "<show isPaid boolean data>",
    "qty: "<show qty data>",
    "createdAt": "<createdAt to get update into>",
    "updatedAt": "<updatedAt to get update into>"
  }
]
```

### DELETE /carts/:cartId
> Delete carts base on selected cart id

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Parameter_
```
  "id": "<selected cart id>"
```

_Response (200)_
```
{
  "id": <show id by system>,
  "ProductId": "<show ProductId data>",
  "UserId": "<show UserId data>",
  "isPaid: "<show isPaid boolean data>",
  "qty: "<show qty data>",
  "createdAt": "<createdAt to get update into>",
  "updatedAt": "<updatedAt to get update into>"
}
  
```


## User Admin Routes

### POST /login
> Login Admin

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get login>",
  "password": "<password to get login>"
}
```

_Response (200)_
```
{
  "access_token": "<access_token JWT>",
  "id": "<user id>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "email cannot be empty" ||
              "password cannot be empty"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```


## User Customer Routes

### POST /loginCust
> Login Customer

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get login>",
  "password": "<password to get login>"
}
```

_Response (200)_
```
{
  "access_token": "<access_token JWT>",
  "id": "<user id>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "email cannot be empty" ||
              "password cannot be empty"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

### POST /registerCust
> Register Customer

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get register>",
  "password": "<password to get register>"
}
```

_Response (201)_
```
{
  "id": "<show id auto generate from database>",
  "email": "<show email which registered>",
  "password": "<show encrypted password which registered>",
  "role": "<show role which registered>",
  "createdAt": "<show created date>",
  "updatedAt": "<show updated date>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "email cannot be empty" ||
              "password cannot be empty"
}
```

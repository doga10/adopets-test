# **Adopets Node API**

---

This API is the adopets selection process.

> ## Requirements

* docker

> ## Start Projects

* docker-compose up --build

> ## Endpoints

* POST /api/signup (`curl -d '{"name":"name","email":"email","password":"password","passwordConfirmation":"password"}' -H "Content-Type: application/json" -X POST http://localhost:5050/api/signup`)
  * body
    - name
    - email
    - password
    - passwordConfirmation

* POST /api/login (`curl -d '{"email":"email","password":"password"}' -H "Content-Type: application/json" -X POST http://localhost:5050/api/login`)
  * body
    - email
    - password

* POST /api/logout (`curl --header "x-access-token: token" -H "Content-Type: application/json" -X POST http://localhost:5050/api/logout`)
  * body
    - email
    - password

* POST /api/products (`curl -d '{"name":"name","description":"description","category":"category","price":10.00,"stock":10}' --header "x-access-token: token" -H "Content-Type: application/json" -X POST http://localhost:5050/api/products`)
  * headers
    - token
  * body
    - name
    - description
    - category
    - price
    - stock

* PUT /api/products/:id (`curl -d '{"name":"name","description":"description","category":"category","price":10.00,"stock":10}' --header "x-access-token: token" -H "Content-Type: application/json" -X PUT http://localhost:5050/api/products/:id`)
  * headers
    - token
  * params
    - id
  * body
    - name
    - description
    - category
    - price
    - stock

* GET /api/products/:id (`curl --header "x-access-token: token" -H "Content-Type: application/json" -X GET http://localhost:5050/api/products/:id`)
  * headers
    - token
  * params
    - id

* DELETE /api/products/:id (`curl --header "x-access-token: token" -H "Content-Type: application/json" -X DELETE http://localhost:5050/api/products/:id`)
  * headers
    - token
  * params
    - id

* GET /api/products/:id (`curl --header "x-access-token: token" -H "Content-Type: application/json" -X GET http://localhost:5050/api/products?page=1&limit=10&name=name&category=category&description=description`)
  * headers
    - token
  * queryString
    - page
    - limit
    - name
    - category
    - description
# **Adopets Node API**

---

This API is the adopets selection process.

> ## Requirements

* docker

> ## Start Projects

* docker-compose up --build

> ## Endpoints

* POST /api/signup (`curl -d '{"name":"name","email":"email","password":"password","passwordConfirmation":"password"}' -H "Content-Type: application/json" -X POST https://adopets-node-api.herokuapp.com/api/signup`)
  * body
    - name
    - email
    - password
    - passwordConfirmation

* POST /api/login (`curl -d '{"email":"email","password":"password"}' -H "Content-Type: application/json" -X POST https://adopets-node-api.herokuapp.com/api/login`)
  * body
    - email
    - password

* POST /api/logout (`curl --header "x-access-token: token" -H "Content-Type: application/json" -X POST https://adopets-node-api.herokuapp.com/api/logout`)
  * body
    - email
    - password

* POST /api/products (`curl -d '{"name":"name","description":"description","category":"category","price":10.00,"stock":10}' --header "x-access-token: token" -H "Content-Type: application/json" -X POST https://adopets-node-api.herokuapp.com/api/products`)
  * headers
    - token
  * body
    - name
    - description
    - category
    - price
    - stock

* PUT /api/products/:id (`curl -d '{"name":"name","description":"description","category":"category","price":10.00,"stock":10}' --header "x-access-token: token" -H "Content-Type: application/json" -X PUT https://adopets-node-api.herokuapp.com/api/products/:id`)
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

* GET /api/products/:id (`curl --header "x-access-token: token" -H "Content-Type: application/json" -X GET https://adopets-node-api.herokuapp.com/api/products/:id`)
  * headers
    - token
  * params
    - id

* DELETE /api/products/:id (`curl --header "x-access-token: token" -H "Content-Type: application/json" -X DELETE https://adopets-node-api.herokuapp.com/api/products/:id`)
  * headers
    - token
  * params
    - id

* GET /api/products/:id (`curl --header "x-access-token: token" -H "Content-Type: application/json" -X GET https://adopets-node-api.herokuapp.com/api/products?page=1&limit=10&name=name&category=category&description=description`)
  * headers
    - token
  * queryString
    - page
    - limit
    - name
    - category
    - description
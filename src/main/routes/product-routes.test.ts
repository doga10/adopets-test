import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import { sign } from 'jsonwebtoken'

let productCollection: Collection
const mockProductId = async (): Promise<string> => {
  const res = await productCollection.insertOne({
    name: 'Douglas',
    description: 'douglasdennys45@gmail.com',
    category: 'douglasdennys45@gmail.com',
    price: 12.50,
    stock: 50
  })
  return res.ops[0]._id
}

let accountCollection: Collection
const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Douglas',
    email: 'douglasdennys45@gmail.com',
    password: '123'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Product Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    productCollection = await MongoHelper.getCollection('products')
    await productCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('GET /products', () => {
    test('Should return 200 on load products with valid', async () => {
      await mockProductId()
      await mockProductId()
      const accessToken = await mockAccessToken()

      await request(app)
        .get('/api/products/?page=1&limit=10')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 204 on load products with valid', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/api/products/?page=1&limit=10')
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 403 on load products without accessToken', async () => {
      await mockProductId()
      await mockProductId()

      await request(app)
        .get('/api/products/?page=1&limit=10')
        .expect(403)
    })
  })

  describe('POST /products', () => {
    test('Should return 204 on add product with valid', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/products')
        .set('x-access-token', accessToken)
        .send({
          name: 'name',
          description: 'description',
          category: 'category',
          price: 10.00,
          stock: 100
        })
        .expect(204)
    })

    test('Should return 403 on add product without accessToken', async () => {
      await request(app)
        .post('/api/products')
        .send({
          name: 'name',
          description: 'description',
          category: 'category',
          price: 10.00,
          stock: 100
        })
        .expect(403)
    })
  })

  describe('GET /products/:productId', () => {
    test('Should return 200 on load product by id with valid', async () => {
      const accessToken = await mockAccessToken()
      const productId = await mockProductId()
      await request(app)
        .get('/api/products/' + productId)
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 403 on load product without accessToken', async () => {
      const productId = await mockProductId()
      await request(app)
        .get('/api/products/' + productId)
        .expect(403)
    })
  })

  describe('PUT /products/:productId', () => {
    test('Should return 200 on save product with valid', async () => {
      const accessToken = await mockAccessToken()
      const productId = await mockProductId()

      await request(app)
        .put('/api/products/' + productId)
        .set('x-access-token', accessToken)
        .send({
          name: 'name',
          description: 'description2',
          category: 'category2',
          price: 10.00,
          stock: 100
        })
        .expect(200)
    })

    test('Should return 403 on update product without accessToken', async () => {
      const productId = await mockProductId()
      await request(app)
        .put('/api/products/' + productId)
        .send({
          name: 'name',
          description: 'description2',
          category: 'category2',
          price: 10.00,
          stock: 100
        })
        .expect(403)
    })
  })

  describe('DELETE /products/:productId', () => {
    test('Should return 204 on delete product with valid', async () => {
      const accessToken = await mockAccessToken()
      const productId = await mockProductId()
      await request(app)
        .delete('/api/products/' + productId)
        .set('x-access-token', accessToken)
        .expect(204)
    })

    test('Should return 403 on delete product without accessToken', async () => {
      const productId = await mockProductId()
      await request(app)
        .delete('/api/products/' + productId)
        .expect(403)
    })
  })
})

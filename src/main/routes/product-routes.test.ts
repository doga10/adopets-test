import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'

let productCollection: Collection
const mockProductId = async (): Promise<string> => {
  const res = await productCollection.insertOne({
    name: 'Rodrigo',
    description: 'rodrigo.manguinho@gmail.com',
    category: 'rodrigo.manguinho@gmail.com',
    price: 12.50,
    stock: 50
  })
  return res.ops[0]._id
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
  })

  describe('POST /products', () => {
    test('Should return 204 on add product with valid', async () => {
      await request(app)
        .post('/api/products')
        .send({
          name: 'name',
          description: 'description',
          category: 'category',
          price: 10.00,
          stock: 100
        })
        .expect(204)
    })
  })

  describe('GET /products/:productId', () => {
    test('Should return 200 on load product by id with valid', async () => {
      const productId = await mockProductId()
      await request(app)
        .get('/api/products/' + productId)
        .expect(200)
    })
  })

  describe('PUT /products/:productId', () => {
    test('Should return 200 on save product with valid', async () => {
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
        .expect(200)
    })
  })

  describe('DELETE /products/:productId', () => {
    test('Should return 204 on delete product with valid', async () => {
      const productId = await mockProductId()
      await request(app)
        .delete('/api/products/' + productId)
        .expect(204)
    })
  })
})

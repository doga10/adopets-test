import { ProductMongoRepository } from './product-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { mockAddProductParams } from '@/domain/test'
import { Collection } from 'mongodb'

let productCollection: Collection

describe('ProductMongoRepository', () => {
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

  const makeSut = (): ProductMongoRepository => {
    return new ProductMongoRepository()
  }

  describe('add()', () => {
    test('Should return an product on success', async () => {
      const sut = makeSut()
      const addProductParams = mockAddProductParams()
      const product = await sut.add(addProductParams)
      expect(product).toBeTruthy()
      expect(product.id).toBeTruthy()
      expect(product.name).toBe(addProductParams.name)
      expect(product.description).toBe(addProductParams.description)
      expect(product.category).toBe(addProductParams.category)
      expect(product.price).toBe(addProductParams.price)
      expect(product.stock).toBe(addProductParams.stock)
    })
  })

  describe('loadById()', () => {
    test('Should return an product on success', async () => {
      const sut = makeSut()
      const addProductParams = mockAddProductParams()
      const res = await productCollection.insertOne(addProductParams)
      const product = await sut.loadById(res.ops[0]._id)
      expect(product).toBeTruthy()
      expect(product.id).toBeTruthy()
      expect(product.name).toBe(addProductParams.name)
      expect(product.description).toBe(addProductParams.description)
      expect(product.category).toBe(addProductParams.category)
      expect(product.price).toBe(addProductParams.price)
      expect(product.stock).toBe(addProductParams.stock)
    })
  })
})

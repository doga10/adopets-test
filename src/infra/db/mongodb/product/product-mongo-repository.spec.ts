import { ProductMongoRepository } from './product-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { mockAddProductParams } from '@/domain/test'
import { Collection, ObjectId } from 'mongodb'

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

  describe('load()', () => {
    test('Should load all products on success', async () => {
      const addProductModels = [mockAddProductParams(), mockAddProductParams()]
      await productCollection.insertMany(addProductModels)
      const sut = makeSut()
      const products = await sut.load({}, { page: 1, limit: 10 })

      expect(products[0].id).toBeTruthy()
      expect(products[0].name).toBe(addProductModels[0].name)
      expect(products[0].description).toBe(addProductModels[0].description)
      expect(products[0].category).toBe(addProductModels[0].category)
      expect(products[0].price).toBe(addProductModels[0].price)
      expect(products[0].stock).toBe(addProductModels[0].stock)
      expect(products[1].id).toBeTruthy()
      expect(products[1].name).toBe(addProductModels[1].name)
      expect(products[1].description).toBe(addProductModels[1].description)
      expect(products[1].category).toBe(addProductModels[1].category)
      expect(products[1].price).toBe(addProductModels[1].price)
      expect(products[1].stock).toBe(addProductModels[1].stock)
      expect(products.length).toBe(2)

      const products2 = await sut.load({}, { page: 1, limit: 1 })
      expect(products2[0].id).toBeTruthy()
      expect(products2.length).toBe(1)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const products = await sut.load({}, { page: 1, limit: 10 })
      expect(products.length).toBe(0)
    })
  })

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

  describe('delete()', () => {
    test('Should return an product on success', async () => {
      const sut = makeSut()
      const addProductParams = mockAddProductParams()
      const res = await productCollection.insertOne(addProductParams)
      const product = await sut.delete(res.ops[0]._id.toString())
      expect(product).toBeFalsy()
    })
  })

  describe('save()', () => {
    test('Should update product result if success', async () => {
      const addProductParams = mockAddProductParams()
      const res = await productCollection.insertOne(addProductParams)

      const sut = makeSut()
      await sut.save(res.ops[0]._id, {
        name: 'string',
        description: 'string',
        category: 'string',
        price: 10,
        stock: 10
      })
      const productResult = await productCollection
        .find({
          _id: new ObjectId(res.ops[0]._id)
        })
        .toArray()
      expect(productResult).toBeTruthy()
      expect(productResult.length).toBe(1)
    })
  })
})

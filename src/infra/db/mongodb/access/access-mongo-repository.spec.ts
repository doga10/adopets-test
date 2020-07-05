import { AccessMongoRepository } from './access-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

const makeSut = (): AccessMongoRepository => {
  return new AccessMongoRepository()
}

describe('AccessMongoRepository', () => {
  let accessCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accessCollection = await MongoHelper.getCollection('access')
    await accessCollection.deleteMany({})
  })

  test('Should create an access on success', async () => {
    const sut = makeSut()
    await sut.logAccess({})
    const count = await accessCollection.countDocuments()
    expect(count).toBe(1)
  })
})

import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

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
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Douglas',
          email: 'douglasdennys45@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Douglas',
          email: 'douglasdennys45@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(403)
    })
  })

  describe('POST /logout', () => {
    test('Should return 204 on logout with valid', async () => {
      const accessToken = await mockAccessToken()

      await request(app)
        .post('/api/logout')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Rodrigo',
        email: 'rodrigo.manguinho@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'rodrigo.manguinho@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'rodrigo.manguinho@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})

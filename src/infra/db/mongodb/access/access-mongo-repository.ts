import { MongoHelper } from '../helpers/mongo-helper'
import { AccessRepository } from '@/data/protocols/db/access/access-repository'

export class AccessMongoRepository implements AccessRepository {
  async logAccess (data: any): Promise<void> {
    const accessCollection = await MongoHelper.getCollection('access')
    await accessCollection.insertOne(data)
  }
}

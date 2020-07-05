import { MongoHelper } from '../helpers/mongo-helper'
import { AddProductParams } from '@/domain/usecases/product/add-product'
import { ProductModel } from '@/domain/models/product'
import { AddProductRepository } from '@/data/protocols/db/product/add-product-repository'
import { LoadProductByIdRepository } from '@/data/protocols/db/product/load-product-by-id-repository'
import { ObjectId } from 'mongodb'

export class ProductMongoRepository implements AddProductRepository, LoadProductByIdRepository {
  async add (data: AddProductParams): Promise<ProductModel> {
    const productCollection = await MongoHelper.getCollection('products')
    const result = await productCollection.insertOne(data)
    return MongoHelper.map(result.ops[0])
  }

  async loadById (id: string): Promise<ProductModel> {
    const productCollection = await MongoHelper.getCollection('products')
    const result = await productCollection.findOne({ _id: new ObjectId(id) })
    return result && MongoHelper.map(result)
  }

  async save (id: string, data: AddProductParams): Promise<any> {
    const productCollection = await MongoHelper.getCollection('products')
    const product = await productCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data }, { returnOriginal: true })
    return product
  }
}

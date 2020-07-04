import { AddProduct } from '@/domain/usecases/product/add-product'
import { ProductMongoRepository } from '@/infra/db/mongodb/product/product-mongo-repository'
import { DbAddProduct } from '@/data/usecases/product/add-product/db-add-product'

export const makeDbAddProduct = (): AddProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbAddProduct(productMongoRepository)
}

import { ProductMongoRepository } from '@/infra/db/mongodb/product/product-mongo-repository'
import { DeleteProduct } from '@/domain/usecases/product/delete-product'
import { DbDeleteProduct } from '@/data/usecases/product/delete-product/db-delete-product'

export const makeDbDeleteProduct = (): DeleteProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbDeleteProduct(productMongoRepository)
}

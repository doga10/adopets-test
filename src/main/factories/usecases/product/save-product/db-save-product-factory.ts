import { SaveProduct } from '@/domain/usecases/product/save-product'
import { DbSaveProduct } from '@/data/usecases/product/save-product/db-save-product'
import { ProductMongoRepository } from '@/infra/db/mongodb/product/product-mongo-repository'

export const makeDbSaveProduct = (): SaveProduct => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbSaveProduct(productMongoRepository)
}

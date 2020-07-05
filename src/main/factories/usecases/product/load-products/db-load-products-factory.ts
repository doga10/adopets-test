import { ProductMongoRepository } from '@/infra/db/mongodb/product/product-mongo-repository'
import { LoadProducts } from '@/domain/usecases/product/load-products'
import { DbLoadProducts } from '@/data/usecases/product/load-products/db-load-products'

export const makeDbLoadProducts = (): LoadProducts => {
  const productMongoRepository = new ProductMongoRepository()
  return new DbLoadProducts(productMongoRepository)
}

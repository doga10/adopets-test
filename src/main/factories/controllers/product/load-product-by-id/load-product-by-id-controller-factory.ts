import { makeDbLoadProductById } from '@/main/factories/usecases/product/load-product-by-id/db-load-product-by-id-factory'
import { Controller } from '@/presentation/protocols'
import { LoadProductByIdController } from '@/presentation/controllers/product/load-product-by-id/load-product-by-id-controller'

export const makeLoadProductByIdController = (): Controller => {
  const controller = new LoadProductByIdController(makeDbLoadProductById())
  return controller
}

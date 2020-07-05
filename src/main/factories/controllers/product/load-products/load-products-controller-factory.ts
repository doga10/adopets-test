import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadProducts } from '@/main/factories/usecases/product/load-products/db-load-products-factory'
import { Controller } from '@/presentation/protocols'
import { LoadProductsController } from '@/presentation/controllers/product/load-products/load-products-controller'

export const makeLoadProductsController = (): Controller => {
  const controller = new LoadProductsController(makeDbLoadProducts())
  return makeLogControllerDecorator(controller)
}

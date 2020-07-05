import { makeDbLoadProductById } from '@/main/factories/usecases/product/load-product-by-id/db-load-product-by-id-factory'
import { Controller } from '@/presentation/protocols'
import { LoadProductByIdController } from '@/presentation/controllers/product/load-product-by-id/load-product-by-id-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeAccessControllerDecorator } from '@/main/factories/decorators/access-controller-decorator-factory'

export const makeLoadProductByIdController = (): Controller => {
  const controller = new LoadProductByIdController(makeDbLoadProductById())
  return makeAccessControllerDecorator(makeLogControllerDecorator(controller))
}

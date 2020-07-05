import { makeDbDeleteProduct } from '@/main/factories/usecases/product/delete-product/db-delete-product-factory'
import { Controller } from '@/presentation/protocols'
import { DeleteProductController } from '@/presentation/controllers/product/delete-product/delete-product-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeDeleteProductController = (): Controller => {
  const controller = new DeleteProductController(makeDbDeleteProduct())
  return makeLogControllerDecorator(controller)
}

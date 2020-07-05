import { makeAddProductValidation } from './add-product-validation-factory'
import { makeDbAddProduct } from '@/main/factories/usecases/product/add-product/db-add-product-factory'
import { Controller } from '@/presentation/protocols'
import { AddProductController } from '@/presentation/controllers/product/add-product/add-product-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeAddProductController = (): Controller => {
  const controller = new AddProductController(makeAddProductValidation(), makeDbAddProduct())
  return makeLogControllerDecorator(controller)
}

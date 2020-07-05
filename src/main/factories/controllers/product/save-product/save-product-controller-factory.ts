import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { SaveProductController } from '@/presentation/controllers/product/save-product/save-product-controller'
import { makeDbSaveProduct } from '@/main/factories/usecases/product/save-product/db-save-product-factory'

export const makeSaveProductController = (): Controller => {
  const controller = new SaveProductController(makeDbSaveProduct())
  return makeLogControllerDecorator(controller)
}

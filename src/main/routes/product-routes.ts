import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddProductController } from '@/main/factories/controllers/product/add-product/add-product-controller-factory'
import { makeLoadProductByIdController } from '@/main/factories/controllers/product/load-product-by-id/load-product-by-id-controller-factory'
import { makeSaveProductController } from '../factories/controllers/product/save-product/save-product-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/products', adaptRoute(makeAddProductController()))
  router.get('/products/:productId', adaptRoute(makeLoadProductByIdController()))
  router.put('/products/:productId', adaptRoute(makeSaveProductController()))
}

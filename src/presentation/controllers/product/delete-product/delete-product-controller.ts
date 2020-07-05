import { Controller, HttpRequest, HttpResponse } from './delete-product-controller-protocols'
import { serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { DeleteProduct } from '@/domain/usecases/product/delete-product'

export class DeleteProductController implements Controller {
  constructor (private readonly deleteProduct: DeleteProduct) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.deleteProduct.delete(httpRequest.params.productId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

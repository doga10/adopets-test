import { Controller, HttpRequest, HttpResponse } from './load-product-by-id-controller-protocols'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadProductById } from '@/domain/usecases/product/load-product-by-id'

export class LoadProductByIdController implements Controller {
  constructor (private readonly loadProductById: LoadProductById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const product = await this.loadProductById.loadById(httpRequest.params.productId)
      return ok(product)
    } catch (error) {
      return serverError(error)
    }
  }
}

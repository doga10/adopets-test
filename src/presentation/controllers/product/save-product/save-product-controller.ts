import { Controller, HttpRequest, HttpResponse, SaveProduct } from './save-product-controller-protocols'
import { serverError, ok } from '@/presentation/helpers/http/http-helper'

export class SaveProductController implements Controller {
  constructor (
    private readonly saveProduct: SaveProduct
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { productId } = httpRequest.params
      const surveyResult = await this.saveProduct.save(productId, httpRequest.body)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

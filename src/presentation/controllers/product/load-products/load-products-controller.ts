import { Controller, HttpRequest, HttpResponse, LoadProducts } from './load-products-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'

export class LoadProductsController implements Controller {
  constructor (private readonly loadProducts: LoadProducts) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const paginate = httpRequest.paginate
      const params = httpRequest.query
      delete params.page
      delete params.limit

      const products = await this.loadProducts.load(params, paginate)
      return products.length ? ok(products) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

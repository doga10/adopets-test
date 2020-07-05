import { LoadProducts, ProductModel, LoadProductsRepository, QueryStringParams } from './db-load-products-protocols'
import { Paginate } from '@/domain/models/query'

export class DbLoadProducts implements LoadProducts {
  constructor (private readonly loadProductsRepository: LoadProductsRepository) {}

  async load (params: QueryStringParams, paginate: Paginate): Promise<ProductModel[]> {
    return await this.loadProductsRepository.load(params, paginate)
  }
}

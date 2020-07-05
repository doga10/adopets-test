import { ProductModel } from '@/domain/models/product'
import { QueryStringParams, Paginate } from '@/domain/models/query'

export interface LoadProductsRepository {
  load: (params: QueryStringParams, paginate: Paginate) => Promise<ProductModel[]>
}

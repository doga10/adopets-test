import { ProductModel } from '@/domain/models/product'
import { QueryStringParams, Paginate } from '@/domain/models/query'

export interface LoadProducts {
  load: (params: QueryStringParams, paginate: Paginate) => Promise<ProductModel[]>
}

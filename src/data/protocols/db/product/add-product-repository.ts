import { AddProductParams } from '@/domain/usecases/product/add-product'
import { ProductModel } from '@/domain/models/product'

export interface AddProductRepository {
  add: (data: AddProductParams) => Promise<ProductModel>
}

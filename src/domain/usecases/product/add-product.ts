import { ProductModel } from '@/domain/models/product'

export type AddProductParams = Omit<ProductModel, 'id'>

export interface AddProduct {
  add: (product: AddProductParams) => Promise<ProductModel>
}

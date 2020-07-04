import { ProductModel } from '@/domain/models/product'

export interface AddProduct {
  loadById: (id: string) => Promise<ProductModel>
}

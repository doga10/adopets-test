import { ProductModel } from '@/domain/models/product'

export type SaveProductParams = Omit<ProductModel, 'id'>

export interface SaveProduct {
  save: (id: string, data: SaveProductParams) => Promise<ProductModel>
}

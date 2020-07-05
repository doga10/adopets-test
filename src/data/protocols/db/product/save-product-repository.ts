import { SaveProductParams } from '@/domain/usecases/product/save-product'
import { ProductModel } from '@/domain/models/product'

export interface SaveProductRepository {
  save: (id: string, data: SaveProductParams) => Promise<ProductModel>
}

import { SaveProduct, SaveProductParams, ProductModel, SaveProductRepository } from './db-save-product-protocols'

export class DbSaveProduct implements SaveProduct {
  constructor (
    private readonly saveProductRepository: SaveProductRepository
  ) {}

  async save (id: string, data: SaveProductParams): Promise<ProductModel> {
    return await this.saveProductRepository.save(id, data)
  }
}

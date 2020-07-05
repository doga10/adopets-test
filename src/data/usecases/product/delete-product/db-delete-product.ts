import { DeleteProductRepository, DeleteProduct } from './db-load-product-by-id-protocols'

export class DbDeleteProduct implements DeleteProduct {
  constructor (private readonly deleteProductRepository: DeleteProductRepository) {}

  async delete (id: string): Promise<void> {
    await this.deleteProductRepository.delete(id)
  }
}

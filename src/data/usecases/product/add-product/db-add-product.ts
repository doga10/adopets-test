import { AddProduct, AddProductParams, ProductModel, AddProductRepository } from './db-add-product-protocols'

export class DbAddProduct implements AddProduct {
  constructor (
    private readonly addProductRepository: AddProductRepository
  ) {}

  async add (productData: AddProductParams): Promise<ProductModel> {
    return await this.addProductRepository.add(productData)
  }
}

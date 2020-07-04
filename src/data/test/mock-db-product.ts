import { AddProductRepository } from '@/data/protocols/db/product/add-product-repository'
import { LoadProductByIdRepository } from '@/data/protocols/db/product/load-product-by-id-repository'
import { AddProductParams } from '@/domain/usecases/product/add-product'
import { ProductModel } from '@/domain/models/product'
import { mockProductModel } from '@/domain/test'

export class AddProductRepositorySpy implements AddProductRepository {
  productModel = mockProductModel()
  addProductParams: AddProductParams

  async add (data: AddProductParams): Promise<ProductModel> {
    this.addProductParams = data
    return this.productModel
  }
}

export class LoadProductByIdRepositorySpy implements LoadProductByIdRepository {
  productModel = mockProductModel()
  id: string

  async loadById (id: string): Promise<ProductModel> {
    this.id = id
    return this.productModel
  }
}

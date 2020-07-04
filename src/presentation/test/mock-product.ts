import { AddProductParams, AddProduct } from '@/domain/usecases/product/add-product'
import { LoadProductById } from '@/domain/usecases/product/load-product-by-id'
import { ProductModel } from '@/domain/models/product'
import { mockProductModel } from '@/domain/test'

export class AddProductSpy implements AddProduct {
  productModel = mockProductModel()
  addProductParams: AddProductParams

  async add (data: AddProductParams): Promise<ProductModel> {
    this.addProductParams = data
    return this.productModel
  }
}

export class LoadProductByIdSpy implements LoadProductById {
  productModel = mockProductModel()
  id: string

  async loadById (id: string): Promise<ProductModel> {
    this.id = id
    return this.productModel
  }
}

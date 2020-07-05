import { AddProductParams, AddProduct } from '@/domain/usecases/product/add-product'
import { LoadProductById } from '@/domain/usecases/product/load-product-by-id'
import { ProductModel } from '@/domain/models/product'
import { mockProductModel } from '@/domain/test'
import { SaveProduct, SaveProductParams } from '../controllers/product/save-product/save-product-controller-protocols'

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

export class SaveProductSpy implements SaveProduct {
  productModel = mockProductModel()
  saveProductParams: SaveProductParams
  id: string

  async save (id: string, data: SaveProductParams): Promise<ProductModel> {
    this.saveProductParams = data
    this.id = id
    return this.productModel
  }
}

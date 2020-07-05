import { AddProductParams, AddProduct } from '@/domain/usecases/product/add-product'
import { LoadProductById } from '@/domain/usecases/product/load-product-by-id'
import { ProductModel } from '@/domain/models/product'
import { mockProductModel } from '@/domain/test'
import { SaveProduct, SaveProductParams } from '../controllers/product/save-product/save-product-controller-protocols'
import { DeleteProduct } from '@/domain/usecases/product/delete-product'
import { LoadProducts } from '@/domain/usecases/product/load-products'
import { QueryStringParams, Paginate } from '@/domain/models/query'

export class AddProductSpy implements AddProduct {
  productModel = mockProductModel()
  addProductParams: AddProductParams

  async add (data: AddProductParams): Promise<ProductModel> {
    this.addProductParams = data
    return this.productModel
  }
}

export class LoadProductsSpy implements LoadProducts {
  productModels = [mockProductModel(), mockProductModel()]
  params: QueryStringParams
  paginate: Paginate

  async load (params: QueryStringParams, paginate: Paginate): Promise<ProductModel[]> {
    this.params = params
    this.paginate = paginate
    return this.productModels
  }
}

export class DeleteProductSpy implements DeleteProduct {
  id: string

  async delete (id: string): Promise<void> {
    this.id = id
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

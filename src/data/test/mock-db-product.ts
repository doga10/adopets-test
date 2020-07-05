import { AddProductRepository } from '@/data/protocols/db/product/add-product-repository'
import { LoadProductByIdRepository } from '@/data/protocols/db/product/load-product-by-id-repository'
import { AddProductParams } from '@/domain/usecases/product/add-product'
import { ProductModel } from '@/domain/models/product'
import { mockProductModel } from '@/domain/test'
import { SaveProductRepository } from '../protocols/db/product/save-product-repository'
import { SaveProductParams } from '../usecases/product/save-product/db-save-product-protocols'
import { DeleteProductRepository } from '../protocols/db/product/delete-product-repository'

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

export class DeleteProductRepositorySpy implements DeleteProductRepository {
  id: string

  async delete (id: string): Promise<void> {
    this.id = id
  }
}

export class SaveProductRepositorySpy implements SaveProductRepository {
  productParams: SaveProductParams
  id: string
  productModel = mockProductModel()

  async save (id: string, data: SaveProductParams): Promise<ProductModel> {
    this.productParams = data
    this.id = id
    return this.productModel
  }
}

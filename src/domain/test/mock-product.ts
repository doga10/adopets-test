import { ProductModel } from '@/domain/models/product'
import { AddProductParams } from '@/domain/usecases/product/add-product'
import faker from 'faker'

export const mockAddProductParams = (): AddProductParams => ({
  name: faker.name.findName(),
  description: faker.name.findName(),
  category: faker.name.findName(),
  price: 10.00,
  stock: 10
})

export const mockProductModel = (): ProductModel => ({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  description: faker.name.findName(),
  category: faker.name.findName(),
  price: 10.00,
  stock: 10
})

export const mockProductsModel = (): ProductModel[] => ([{
  id: faker.random.uuid(),
  name: faker.name.findName(),
  description: faker.name.findName(),
  category: faker.name.findName(),
  price: 10.00,
  stock: 10
}])

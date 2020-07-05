import { DbLoadProducts } from './db-load-products'
import { LoadProductsRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadProducts
  loadProductsRepositorySpy: LoadProductsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadProductsRepositorySpy = new LoadProductsRepositorySpy()
  const sut = new DbLoadProducts(loadProductsRepositorySpy)
  return {
    sut,
    loadProductsRepositorySpy
  }
}

describe('DbLoadProducs', () => {
  test('Should call LoadProductsRepository', async () => {
    const { sut, loadProductsRepositorySpy } = makeSut()
    const params = {
      name: faker.name.findName(),
      description: faker.name.findName(),
      category: faker.name.findName()
    }
    const paginate = {
      page: 1,
      limit: 5
    }
    await sut.load(params, paginate)
    expect(loadProductsRepositorySpy.params).toBe(params)
    expect(loadProductsRepositorySpy.paginate).toBe(paginate)
  })

  test('Should return LoadProductsRepository on success', async () => {
    const { sut, loadProductsRepositorySpy } = makeSut()
    const params = {
      name: faker.name.findName(),
      description: faker.name.findName(),
      category: faker.name.findName()
    }
    const paginate = {
      page: 1,
      limit: 5
    }
    const product = await sut.load(params, paginate)
    expect(product).toEqual(loadProductsRepositorySpy.productModel)
  })

  test('Should throw if LoadProductsRepository throws', async () => {
    const { sut, loadProductsRepositorySpy } = makeSut()
    jest.spyOn(loadProductsRepositorySpy, 'load').mockImplementationOnce(throwError)
    const params = {
      name: faker.name.findName(),
      description: faker.name.findName(),
      category: faker.name.findName()
    }
    const paginate = {
      page: 1,
      limit: 5
    }
    const promise = sut.load(params, paginate)
    await expect(promise).rejects.toThrow()
  })
})

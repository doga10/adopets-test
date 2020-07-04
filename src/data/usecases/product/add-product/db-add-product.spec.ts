import { DbAddProduct } from './db-add-product'
import { AddProductRepositorySpy } from '@/data/test'
import { mockAddProductParams, throwError } from '@/domain/test'

type SutTypes = {
  sut: DbAddProduct
  addProductRepositorySpy: AddProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProductRepositorySpy = new AddProductRepositorySpy()
  const sut = new DbAddProduct(addProductRepositorySpy)
  return {
    sut,
    addProductRepositorySpy
  }
}

describe('DbAddProduct Usecase', () => {
  test('Should call AddProductRepository with correct values', async () => {
    const { sut, addProductRepositorySpy } = makeSut()
    const addProductParams = mockAddProductParams()
    await sut.add(addProductParams)
    expect(addProductRepositorySpy.addProductParams).toEqual({
      description: addProductParams.description,
      category: addProductParams.category,
      price: addProductParams.price,
      stock: addProductParams.stock,
      name: addProductParams.name
    })
  })

  test('Should throw if AddProductRepository throws', async () => {
    const { sut, addProductRepositorySpy } = makeSut()
    jest.spyOn(addProductRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddProductParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut, addProductRepositorySpy } = makeSut()
    const product = await sut.add(mockAddProductParams())
    expect(product).toEqual(addProductRepositorySpy.productModel)
  })
})

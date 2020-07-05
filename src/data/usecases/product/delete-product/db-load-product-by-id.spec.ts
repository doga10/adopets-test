import { DbDeleteProduct } from './db-delete-product'
import { DeleteProductRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: DbDeleteProduct
  deleteProductRepositorySpy: DeleteProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteProductRepositorySpy = new DeleteProductRepositorySpy()
  const sut = new DbDeleteProduct(deleteProductRepositorySpy)
  return {
    sut,
    deleteProductRepositorySpy
  }
}

let productId: string

describe('DbDeleteProduct', () => {
  beforeEach(() => {
    productId = faker.random.uuid()
  })

  test('Should call DeleteProductRepository', async () => {
    const { sut, deleteProductRepositorySpy } = makeSut()
    await sut.delete(productId)
    expect(deleteProductRepositorySpy.id).toBe(productId)
  })

  test('Should return DeleteProductRepository on success', async () => {
    const { sut } = makeSut()
    const product = await sut.delete(productId)
    expect(product).toEqual(undefined)
  })

  test('Should throw if LoadProductByIdRepository throws', async () => {
    const { sut, deleteProductRepositorySpy } = makeSut()
    jest.spyOn(deleteProductRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(productId)
    await expect(promise).rejects.toThrow()
  })
})

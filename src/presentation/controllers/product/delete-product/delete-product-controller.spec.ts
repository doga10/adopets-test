import { DeleteProductController } from './delete-product-controller'
import { HttpRequest } from './delete-product-controller-protocols'
import { serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { DeleteProductSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({ params: { productId: faker.random.uuid() } })

type SutTypes = {
  sut: DeleteProductController
  deleteProductSpy: DeleteProductSpy
}

const makeSut = (): SutTypes => {
  const deleteProductSpy = new DeleteProductSpy()
  const sut = new DeleteProductController(deleteProductSpy)
  return {
    sut,
    deleteProductSpy
  }
}

describe('DeleteProduct Controller', () => {
  test('Should call DeleteProduct with correct value', async () => {
    const { sut, deleteProductSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(deleteProductSpy.id).toBe(httpRequest.params.productId)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadProductById throws', async () => {
    const { sut, deleteProductSpy } = makeSut()
    jest.spyOn(deleteProductSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

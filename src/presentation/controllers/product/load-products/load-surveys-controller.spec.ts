import { LoadProductsController } from './load-products-controller'
import { HttpRequest } from './load-products-controller-protocols'
import { ok, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadProductsSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'

const mockRequest = (): HttpRequest => ({ query: { page: 1, limit: 10 } })

type SutTypes = {
  sut: LoadProductsController
  loadProductsSpy: LoadProductsSpy
}

const makeSut = (): SutTypes => {
  const loadProductsSpy = new LoadProductsSpy()
  const sut = new LoadProductsController(loadProductsSpy)
  return {
    sut,
    loadProductsSpy
  }
}

describe('LoadProducts Controller', () => {
  test('Should call LoadProducts with correct value', async () => {
    const { sut, loadProductsSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadProductsSpy.paginate).toBe(httpRequest.paginate)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadProductsSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadProductsSpy.productModels))
  })

  test('Should return 204 if loadProducts returns empty', async () => {
    const { sut, loadProductsSpy } = makeSut()
    loadProductsSpy.productModels = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadProductsSpy } = makeSut()
    jest.spyOn(loadProductsSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

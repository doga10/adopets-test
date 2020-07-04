import { LoadProductByIdController } from './load-product-by-id-controller'
import { HttpRequest } from './load-product-by-id-controller-protocols'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { LoadProductByIdSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({ params: { productId: faker.random.uuid() } })

type SutTypes = {
  sut: LoadProductByIdController
  loadProductByIdSpy: LoadProductByIdSpy
}

const makeSut = (): SutTypes => {
  const loadProductByIdSpy = new LoadProductByIdSpy()
  const sut = new LoadProductByIdController(loadProductByIdSpy)
  return {
    sut,
    loadProductByIdSpy
  }
}

describe('LoadProductById Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadProductById with correct value', async () => {
    const { sut, loadProductByIdSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadProductByIdSpy.id).toBe(httpRequest.params.productId)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadProductByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadProductByIdSpy.productModel))
  })

  test('Should return 500 if LoadProductById throws', async () => {
    const { sut, loadProductByIdSpy } = makeSut()
    jest.spyOn(loadProductByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

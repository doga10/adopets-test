import { SaveProductController } from './save-product-controller'
import { HttpRequest } from '@/presentation/protocols'
import { serverError, ok } from '@/presentation/helpers/http/http-helper'
import { SaveProductSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (answer: string = null): HttpRequest => ({
  params: {
    productId: faker.random.uuid()
  },
  body: {
    description: faker.name.findName(),
    category: faker.name.findName(),
    price: 10.00,
    stock: 10
  }
})

type SutTypes = {
  sut: SaveProductController
  saveProductSpy: SaveProductSpy
}

const makeSut = (): SutTypes => {
  const saveProductSpy = new SaveProductSpy()
  const sut = new SaveProductController(saveProductSpy)
  return {
    sut,
    saveProductSpy
  }
}

describe('SaveProduct Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveProduct with correct values', async () => {
    const { sut, saveProductSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(saveProductSpy.saveProductParams).toEqual(httpRequest.body)
  })

  test('Should return 500 if SaveProduct throws', async () => {
    const { sut, saveProductSpy } = makeSut()
    jest.spyOn(saveProductSpy, 'save').mockImplementationOnce(throwError)
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, saveProductSpy } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(saveProductSpy.productModel))
  })
})

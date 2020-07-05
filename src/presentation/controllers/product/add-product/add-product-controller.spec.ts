import { HttpRequest } from '@/presentation/protocols'
import { AddProductController } from './add-product-controller'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { ValidationSpy, AddProductSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.name.findName(),
    description: faker.name.findName(),
    category: faker.name.findName(),
    price: 10.00,
    stock: 10
  }
})

type SutTypes = {
  sut: AddProductController
  validationSpy: ValidationSpy
  addProductSpy: AddProductSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addProductSpy = new AddProductSpy()
  const sut = new AddProductController(validationSpy, addProductSpy)
  return {
    sut,
    validationSpy,
    addProductSpy
  }
}

describe('AddProduct Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddProduct with correct values', async () => {
    const { sut, addProductSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addProductSpy.addProductParams).toEqual(httpRequest.body)
  })

  test('Should return 500 if AddProduct throws', async () => {
    const { sut, addProductSpy } = makeSut()
    jest.spyOn(addProductSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})

import { AccessControllerDecorator } from './access-controller-decorator'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers/http/http-helper'
import { AccessRepositorySpy } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import faker from 'faker'

class ControllerSpy implements Controller {
  httpResponse = ok(mockAccountModel())
  httpRequest: HttpRequest

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return this.httpResponse
  }
}

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password()
  return {
    access: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
  }
}

type SutTypes = {
  sut: AccessControllerDecorator
  controllerSpy: ControllerSpy
  accessRepositorySpy: AccessRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const accessRepositorySpy = new AccessRepositorySpy()
  const sut = new AccessControllerDecorator(controllerSpy, accessRepositorySpy)
  return {
    sut,
    controllerSpy,
    accessRepositorySpy
  }
}

describe('AccessController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(controllerSpy.httpRequest).toEqual(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })
})

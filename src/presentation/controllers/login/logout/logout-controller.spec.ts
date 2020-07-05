import { LogoutController } from './logout-controller'
import { HttpRequest } from '@/presentation/protocols'
import { serverError } from '@/presentation/helpers/http/http-helper'
import { LogoutSpy } from '@/presentation/test'
import { throwError } from '@/domain/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => ({
  accountId: {
    id: faker.random.uuid()
  }
})

type SutTypes = {
  sut: LogoutController
  logoutSpy: LogoutSpy
}

const makeSut = (): SutTypes => {
  const logoutSpy = new LogoutSpy()
  const sut = new LogoutController(logoutSpy)
  return {
    sut,
    logoutSpy
  }
}

describe('Logout Controller', () => {
  test('Should call Logout with correct values', async () => {
    const { sut, logoutSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(logoutSpy.id).toEqual(httpRequest.accountId.id)
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, logoutSpy } = makeSut()
    jest.spyOn(logoutSpy, 'logout').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

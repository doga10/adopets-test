import { DbLogout } from './db-logout'
import { UpdateAccessTokenRepositorySpy } from '@/data/test'
import { throwError, mockLogoutParams } from '@/domain/test'

type SutTypes = {
  sut: DbLogout
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbLogout(updateAccessTokenRepositorySpy)
  return {
    sut,
    updateAccessTokenRepositorySpy
  }
}

describe('DbLogout UseCase', () => {
  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    const mock = mockLogoutParams()
    await sut.logout(mock.accountId)
    expect(updateAccessTokenRepositorySpy.id).toBe(mock.accountId)
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.logout(mockLogoutParams().accountId)
    await expect(promise).rejects.toThrow()
  })
})

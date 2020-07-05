import { DbSaveProduct } from './db-save-product'
import { SaveProductRepositorySpy } from '@/data/test'
import { throwError, mockAddProductParams } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbSaveProduct
  saveProductRepositorySpy: SaveProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveProductRepositorySpy = new SaveProductRepositorySpy()
  const sut = new DbSaveProduct(saveProductRepositorySpy)
  return {
    sut,
    saveProductRepositorySpy
  }
}

let productId: string

describe('DbSaveProduct Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    productId = faker.random.uuid()
  })

  test('Should call SaveProductRepository with correct values', async () => {
    const { sut, saveProductRepositorySpy } = makeSut()
    const productData = mockAddProductParams()
    await sut.save(productId, productData)
    expect(saveProductRepositorySpy.productParams).toEqual(productData)
  })

  test('Should throw if SaveProductRepository throws', async () => {
    const { sut, saveProductRepositorySpy } = makeSut()
    jest.spyOn(saveProductRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(productId, mockAddProductParams())
    await expect(promise).rejects.toThrow()
  })
})

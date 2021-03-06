import { DbLoadProductById } from './db-load-product-by-id'
import { LoadProductByIdRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadProductById
  loadProductByIdRepositorySpy: LoadProductByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadProductByIdRepositorySpy = new LoadProductByIdRepositorySpy()
  const sut = new DbLoadProductById(loadProductByIdRepositorySpy)
  return {
    sut,
    loadProductByIdRepositorySpy
  }
}

let productId: string

describe('DbLoadProductById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    productId = faker.random.uuid()
  })

  test('Should call LoadProductByIdRepository', async () => {
    const { sut, loadProductByIdRepositorySpy } = makeSut()
    await sut.loadById(productId)
    expect(loadProductByIdRepositorySpy.id).toBe(productId)
  })

  test('Should return Product on success', async () => {
    const { sut, loadProductByIdRepositorySpy } = makeSut()
    const product = await sut.loadById(productId)
    expect(product).toEqual(loadProductByIdRepositorySpy.productModel)
  })

  test('Should throw if LoadProductByIdRepository throws', async () => {
    const { sut, loadProductByIdRepositorySpy } = makeSut()
    jest.spyOn(loadProductByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(productId)
    await expect(promise).rejects.toThrow()
  })
})

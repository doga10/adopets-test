import { makeAddProductValidation } from './add-product-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validation-composite')

describe('AddProductValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddProductValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'description', 'price', 'stock', 'category']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

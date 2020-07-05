import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddProductValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'description', 'price', 'stock', 'category']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

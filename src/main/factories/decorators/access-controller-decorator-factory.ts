import { AccessControllerDecorator } from '@/main/decorators/access-controller-decorator'
import { AccessMongoRepository } from '@/infra/db/mongodb/access/access-mongo-repository'
import { Controller } from '@/presentation/protocols'

export const makeAccessControllerDecorator = (controller: Controller): Controller => {
  const accessMongoRepository = new AccessMongoRepository()
  return new AccessControllerDecorator(controller, accessMongoRepository)
}

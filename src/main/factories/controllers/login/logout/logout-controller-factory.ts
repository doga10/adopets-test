import { Controller } from '@/presentation/protocols'
import { LogoutController } from '@/presentation/controllers/login/logout/logout-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeAccessControllerDecorator } from '@/main/factories/decorators/access-controller-decorator-factory'
import { makeDbLogout } from '@/main/factories/usecases/account/logout/db-logout-factory'

export const makeLogoutController = (): Controller => {
  const controller = new LogoutController(makeDbLogout())
  return makeLogControllerDecorator(makeAccessControllerDecorator(controller))
}

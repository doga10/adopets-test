import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { DbLogout } from '@/data/usecases/account/logout/db-logout'
import { Logout } from '@/domain/usecases/account/logout'

export const makeDbLogout = (): Logout => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLogout(accountMongoRepository)
}

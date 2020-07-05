import { Logout, UpdateAccessTokenRepository } from './db-logout-protocols'

export class DbLogout implements Logout {
  constructor (
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async logout (accountId: string): Promise<void> {
    await this.updateAccessTokenRepository.updateAccessToken(accountId, null)
  }
}

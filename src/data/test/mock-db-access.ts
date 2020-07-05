import { AccessRepository } from '@/data/protocols/db/access/access-repository'

export class AccessRepositorySpy implements AccessRepository {
  data: any

  async logAccess (data: string): Promise<void> {
    this.data = data
  }
}

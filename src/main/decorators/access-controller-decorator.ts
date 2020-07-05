import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { AccessRepository } from '@/data/protocols/db/access/access-repository'

export class AccessControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly accessRepository: AccessRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.accessRepository.logAccess(httpRequest.access)
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}

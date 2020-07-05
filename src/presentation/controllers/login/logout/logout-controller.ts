import { Controller, HttpRequest, HttpResponse, Logout } from './logout-controller-protocols'
import { serverError, noContent } from '@/presentation/helpers/http/http-helper'

export class LogoutController implements Controller {
  constructor (
    private readonly logout: Logout
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.logout.logout(httpRequest.accountId.id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

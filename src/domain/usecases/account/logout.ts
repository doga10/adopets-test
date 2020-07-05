export interface Logout {
  logout: (accountId: string) => Promise<void>
}

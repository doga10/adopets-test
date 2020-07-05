export interface AccessRepository {
  logAccess: (data: any) => Promise<void>
}

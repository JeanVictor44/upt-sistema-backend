import { RefreshToken } from '@domain/authentication/enterprise/entities/refresh-token.entity'

export abstract class RefreshTokenRepository {
  abstract create(refreshToken: RefreshToken): Promise<void>
  abstract findByToken(token: string): Promise<RefreshToken | null>
}

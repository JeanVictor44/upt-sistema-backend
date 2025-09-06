import { Inject, Injectable } from '@nestjs/common'
import { RefreshTokenRepository } from '@root/domain/authentication/applications/repositories/refresh-token.repository'
import { RefreshToken } from '@root/domain/authentication/enterprise/entities/refresh-token.entity'

import { RefreshTokenMappers } from '@infra/database/drizzle/mappers/refresh-token.mappers'

import { DATABASE_CONNECTION } from '../database-connection'
import { refreshTokenSchema } from '../schemas/refresh-token.schema'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleRefreshTokenRespository implements RefreshTokenRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(refreshToken: RefreshToken): Promise<void> {
    const preparedData = RefreshTokenMappers.toPersistence(refreshToken)

    await this.db.insert(refreshTokenSchema).values(preparedData)
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const tokenResult = await this.db.query.refreshTokenSchema.findFirst({
      where: (table, { eq }) => eq(table.token, token),
    })

    if (!tokenResult) return null

    return RefreshTokenMappers.toDomain(tokenResult)
  }
}

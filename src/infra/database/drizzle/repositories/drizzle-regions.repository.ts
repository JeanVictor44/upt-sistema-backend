import { Inject, Injectable } from '@nestjs/common'
import { RegionRepository } from '@root/domain/location/applications/repositories/region.repository'
import { Region } from '@root/domain/location/enterprise/entities/region.entity'
import { eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { RegionMappers } from '../mappers/region.mappers'
import { regionSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleRegionsRepository implements RegionRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(region: Region): Promise<void> {
    const preparedData = RegionMappers.toPersistence(region)

    await this.db.insert(regionSchema).values(preparedData)
  }

  async findByName(name: string): Promise<Region | null> {
    const region = await this.db.query.regionSchema.findFirst({
      where: eq(regionSchema.name, name),
    })

    if (!region) return null

    return RegionMappers.toDomain(region)
  }

  async findAll(): Promise<Region[]> {
    const regions = await this.db.query.regionSchema.findMany()

    return regions.map(RegionMappers.toDomain)
  }
}

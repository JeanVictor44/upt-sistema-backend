import { Inject, Injectable } from '@nestjs/common'
import { AsyncMaybe } from '@root/core/logic/Maybe'
import { RegionRepository } from '@root/domain/location/applications/repositories/region.repository'
import { Region } from '@root/domain/location/enterprise/entities/region.entity'
import { asc, eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { RegionMappers } from '../mappers/region.mappers'
import { regionSchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'
import { lower } from '../utils/lower'

@Injectable()
export class DrizzleRegionsRepository implements RegionRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(region: Region): Promise<void> {
    const preparedData = RegionMappers.toPersistence(region)

    await this.db.insert(regionSchema).values(preparedData)
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(regionSchema).where(eq(regionSchema.id, id))
  }

  async findById(id: number): AsyncMaybe<Region> {
    const region = await this.db.query.regionSchema.findFirst({
      where: eq(regionSchema.id, id),
    })

    if (!region) return null

    return RegionMappers.toDomain(region)
  }

  async save(region: Region): Promise<void> {
    const preparedData = RegionMappers.toPersistence(region)

    await this.db.update(regionSchema).set(preparedData).where(eq(regionSchema.id, region.id))
  }

  async findByName(name: string): AsyncMaybe<Region> {
    const region = await this.db.query.regionSchema.findFirst({
      where: eq(lower(regionSchema.name), name.toLowerCase()),
    })

    if (!region) return null

    return RegionMappers.toDomain(region)
  }

  async findAll(): Promise<Region[]> {
    const regions = await this.db.query.regionSchema.findMany({
      orderBy: (region) => asc(region.name),
    })

    return regions.map(RegionMappers.toDomain)
  }
}

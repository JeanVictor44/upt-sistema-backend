import { Inject, Injectable } from '@nestjs/common'
import { CityRepository } from '@root/domain/location/applications/repositories/city.repository'
import { City } from '@root/domain/location/enterprise/entities/city.entity'
import { eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { CityMappers } from '../mappers/city.mappers'
import { citySchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleCityRepository implements CityRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(city: City): Promise<void> {
    const preparedData = CityMappers.toPersistence(city)

    await this.db.insert(citySchema).values(preparedData)
  }

  async findByName(name: string): Promise<City | null> {
    const city = await this.db.query.citySchema.findFirst({
      where: eq(citySchema.name, name),
    })

    if (!city) return null

    return CityMappers.toDomain(city)
  }

  async findAll(): Promise<City[]> {
    const cities = await this.db.query.citySchema.findMany()

    return cities.map(CityMappers.toDomain)
  }
}

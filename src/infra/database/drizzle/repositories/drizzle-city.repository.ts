import { Inject, Injectable } from '@nestjs/common'
import { CityRepository } from '@root/domain/location/applications/repositories/city.repository'
import { City } from '@root/domain/location/enterprise/entities/city.entity'
import { asc, eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import { CityMappers } from '../mappers/city.mappers'
import { citySchema } from '../schemas'
import { DrizzleDB } from '../types/drizzle'
import { lower } from '../utils/lower'

@Injectable()
export class DrizzleCityRepository implements CityRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async create(city: City): Promise<void> {
    const preparedData = CityMappers.toPersistence(city)

    await this.db.insert(citySchema).values(preparedData)
  }

  async save(city: City): Promise<void> {
    const preparedData = CityMappers.toPersistence(city)

    await this.db.update(citySchema).set(preparedData).where(eq(citySchema.id, city.id))
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(citySchema).where(eq(citySchema.id, id))
  }

  async findByName(name: string): Promise<City | null> {
    const city = await this.db.query.citySchema.findFirst({
      where: eq(lower(citySchema.name), name.toLowerCase()),
    })

    if (!city) return null

    return CityMappers.toDomain(city)
  }

  async findById(id: number): Promise<City | null> {
    const city = await this.db.query.citySchema.findFirst({
      where: eq(citySchema.id, id),
    })

    if (!city) return null

    return CityMappers.toDomain(city)
  }

  async findAll(): Promise<City[]> {
    const cities = await this.db.query.citySchema.findMany({
      orderBy: (city) => asc(city.name),
    })

    return cities.map(CityMappers.toDomain)
  }
}

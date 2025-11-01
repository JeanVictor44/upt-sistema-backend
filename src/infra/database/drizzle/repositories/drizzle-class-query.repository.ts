import { Inject, Injectable } from '@nestjs/common'
import { ClassWithDetailsDTO } from '@root/domain/academic/applications/dtos/class-with-details.dto'
import { ClassQueryRepository } from '@root/domain/academic/applications/repositories/class-query-repository'
import { eq } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import {
  citySchema,
  classOptionSchema,
  classSchema,
  classStatusSchema,
  neighborhoodSchema,
  propertyLocationCategorySchema,
  regionSchema,
  shiftSchema,
  teachingPlaceSchema,
} from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleClassQueryRepository implements ClassQueryRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async findAllWithDetails(): Promise<ClassWithDetailsDTO[]> {
    const classes = await this.db
      .select({
        id: classSchema.id,
        name: classSchema.name,
        option: {
          id: classOptionSchema.id,
          name: classOptionSchema.name,
        },
        status: {
          id: classStatusSchema.id,
          name: classStatusSchema.name,
        },
        shift: {
          id: shiftSchema.id,
          name: shiftSchema.name,
        },
        teachingPlace: {
          id: teachingPlaceSchema.id,
          name: teachingPlaceSchema.name,
          neighborhoodId: teachingPlaceSchema.neighborhoodId,
          neighborhoodName: neighborhoodSchema.name,
          cityId: neighborhoodSchema.cityId,
          regionId: neighborhoodSchema.regionId,
          regionName: regionSchema.name,
          cityName: citySchema.name,
          updatedAt: teachingPlaceSchema.updatedAt,
          createdAt: teachingPlaceSchema.createdAt,
          neighborhoodCreatedAt: neighborhoodSchema.createdAt,
          neighborhoodUpdatedAt: neighborhoodSchema.updatedAt,
          propertyLocationCategoryId: teachingPlaceSchema.propertyLocationCategoryId,
          propertyLocationCategoryName: propertyLocationCategorySchema.name,
          traditionalCommunityName: teachingPlaceSchema.traditionalCommunityName,
        },
        createdAt: classSchema.createdAt,
        updatedAt: classSchema.updatedAt,
      })
      .from(classSchema)
      .innerJoin(classOptionSchema, eq(classSchema.optionId, classOptionSchema.id))
      .innerJoin(classStatusSchema, eq(classSchema.statusId, classStatusSchema.id))
      .innerJoin(teachingPlaceSchema, eq(classSchema.teachingPlaceId, teachingPlaceSchema.id))
      .innerJoin(
        propertyLocationCategorySchema,
        eq(teachingPlaceSchema.propertyLocationCategoryId, propertyLocationCategorySchema.id),
      )
      .innerJoin(neighborhoodSchema, eq(teachingPlaceSchema.neighborhoodId, neighborhoodSchema.id))
      .innerJoin(citySchema, eq(neighborhoodSchema.cityId, citySchema.id))
      .innerJoin(regionSchema, eq(neighborhoodSchema.regionId, regionSchema.id))
      .innerJoin(shiftSchema, eq(classSchema.shiftId, shiftSchema.id))

    return classes.map((cls) => ({
      id: cls.id,
      name: cls.name,
      option: {
        id: cls.option.id,
        name: cls.option.name,
      },
      status: {
        id: cls.status.id,
        name: cls.status.name,
      },
      shift: {
        id: cls.shift.id,
        name: cls.shift.name,
      },
      teachingPlace: {
        id: cls.teachingPlace.id,
        name: cls.teachingPlace.name,
        propertyLocationCategory: {
          id: cls.teachingPlace.propertyLocationCategoryId,
          name: cls.teachingPlace.propertyLocationCategoryName,
        },
        traditionalCommunityName: cls.teachingPlace.traditionalCommunityName || undefined,
        neighborhood: {
          id: cls.teachingPlace.neighborhoodId,
          name: cls.teachingPlace.neighborhoodName,
          city: {
            id: cls.teachingPlace.cityId,
            name: cls.teachingPlace.cityName,
          },
          region: {
            id: cls.teachingPlace.regionId,
            name: cls.teachingPlace.regionName,
          },
          createdAt: cls.teachingPlace.neighborhoodCreatedAt,
          updatedAt: cls.teachingPlace.neighborhoodUpdatedAt,
        },
        createdAt: cls.teachingPlace.createdAt,
        updatedAt: cls.teachingPlace.updatedAt,
      },
      createdAt: cls.createdAt,
      updatedAt: cls.updatedAt,
    }))
  }
}

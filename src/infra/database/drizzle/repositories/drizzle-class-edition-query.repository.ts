import { Inject, Injectable } from '@nestjs/common'
import { ClassEditionWithDetailsDTO } from '@root/domain/academic/applications/dtos/class-edition-with-details.dto'
import {
  ClassEditionQueryRepository,
  findAllClassEditionsWithDetailsProps,
} from '@root/domain/academic/applications/repositories/class-edition-query-repository'
import { and, eq, inArray } from 'drizzle-orm'

import { DATABASE_CONNECTION } from '../database-connection'
import {
  citySchema,
  classEditionSchema,
  classOptionSchema,
  classStatusSchema,
  editionSchema,
  neighborhoodSchema,
  propertyLocationCategorySchema,
  regionSchema,
  shiftSchema,
  teachingPlaceSchema,
} from '../schemas'
import { DrizzleDB } from '../types/drizzle'

@Injectable()
export class DrizzleClassEditionQueryRepository implements ClassEditionQueryRepository {
  constructor(@Inject(DATABASE_CONNECTION) private db: DrizzleDB) {}

  async findAllWithDetails(data: findAllClassEditionsWithDetailsProps): Promise<ClassEditionWithDetailsDTO[]> {
    const classes = await this.db
      .select({
        id: classEditionSchema.id,
        enrolledCount: classEditionSchema.enrolledCount,
        edition: {
          id: editionSchema.id,
          year: editionSchema.year,
          createdAt: editionSchema.createdAt,
          updatedAt: editionSchema.updatedAt,
        },

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
          proertyLocationCategoryId: teachingPlaceSchema.propertyLocationCategoryId,
          traditionalCommunityName: teachingPlaceSchema.traditionalCommunityName,
          propertyLocationCategoryName: propertyLocationCategorySchema.name,
        },
        createdAt: classEditionSchema.createdAt,
        updatedAt: classEditionSchema.updatedAt,
      })
      .from(classEditionSchema)
      .where(
        and(
          data?.classEditionIds?.length ? inArray(classEditionSchema.id, data.classEditionIds) : undefined,
          data?.regionId ? eq(regionSchema.id, data.regionId) : undefined,
        ),
      )
      .innerJoin(editionSchema, eq(classEditionSchema.editionId, editionSchema.id))
      .innerJoin(classOptionSchema, eq(classEditionSchema.optionId, classOptionSchema.id))
      .innerJoin(classStatusSchema, eq(classEditionSchema.statusId, classStatusSchema.id))
      .innerJoin(teachingPlaceSchema, eq(classEditionSchema.teachingPlaceId, teachingPlaceSchema.id))
      .innerJoin(
        propertyLocationCategorySchema,
        eq(teachingPlaceSchema.propertyLocationCategoryId, propertyLocationCategorySchema.id),
      )
      .innerJoin(neighborhoodSchema, eq(teachingPlaceSchema.neighborhoodId, neighborhoodSchema.id))
      .innerJoin(citySchema, eq(neighborhoodSchema.cityId, citySchema.id))
      .innerJoin(regionSchema, eq(neighborhoodSchema.regionId, regionSchema.id))
      .innerJoin(shiftSchema, eq(classEditionSchema.shiftId, shiftSchema.id))

    return classes.map((cls) => ({
      id: cls.id,
      enrolledCount: cls.enrolledCount,
      edition: {
        id: cls.edition.id,
        year: cls.edition.year,
        createdAt: cls.edition.createdAt,
        updatedAt: cls.edition.updatedAt,
      },
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
          id: cls.teachingPlace.proertyLocationCategoryId,
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

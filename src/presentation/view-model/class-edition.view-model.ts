import { ClassEditionDetailsDto } from '../swagger/academic/entities/class-edition-details.dto'

export class ClassEditionViewModel {
  static toHttp(classEdtiion: ClassEditionDetailsDto) {
    return {
      id: classEdtiion.id,
      teachingPlace: {
        id: classEdtiion.teachingPlace.id,
        name: classEdtiion.teachingPlace.name,
        propertyLocationCategory: {
          id: classEdtiion.teachingPlace.propertyLocationCategory.id,
          name: classEdtiion.teachingPlace.propertyLocationCategory.name,
        },
        traditionalCommunityName: classEdtiion.teachingPlace.traditionalCommunityName,
        neighborhood: {
          id: classEdtiion.teachingPlace.neighborhood.id,
          name: classEdtiion.teachingPlace.neighborhood.name,
          city: {
            id: classEdtiion.teachingPlace.neighborhood.city.id,
            name: classEdtiion.teachingPlace.neighborhood.city.name,
          },
          region: {
            id: classEdtiion.teachingPlace.neighborhood.region.id,
            name: classEdtiion.teachingPlace.neighborhood.region.name,
          },
          createdAt: classEdtiion.teachingPlace.createdAt,
          updatedAt: classEdtiion.teachingPlace.updatedAt,
        },
        createdAt: classEdtiion.teachingPlace.neighborhood.createdAt,
        updatedAt: classEdtiion.teachingPlace.neighborhood.updatedAt,
      },
      shift: {
        id: classEdtiion.shift.id,
        name: classEdtiion.shift.name,
      },
      option: {
        id: classEdtiion.option.id,
        name: classEdtiion.option.name,
      },
      status: {
        id: classEdtiion.status.id,
        name: classEdtiion.status.name,
      },
      enrolledCount: classEdtiion.enrolledCount,
      edition: classEdtiion.edition,
      createdAt: classEdtiion.createdAt,
      updatedAt: classEdtiion.updatedAt,
    }
  }
}

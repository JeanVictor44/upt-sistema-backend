import { ClassDetailsDto } from '../swagger/academic/entities/class-details.dto'

export class ClassViewModel {
  static toHttp(classResult: ClassDetailsDto) {
    return {
      id: classResult.id,
      name: classResult.name,
      teachingPlace: {
        id: classResult.teachingPlace.id,
        name: classResult.teachingPlace.name,
        propertyLocationCategory: {
          id: classResult.teachingPlace.propertyLocationCategory.id,
          name: classResult.teachingPlace.propertyLocationCategory.name,
        },
        traditionalCommunityName: classResult.teachingPlace.traditionalCommunityName,
        neighborhood: {
          id: classResult.teachingPlace.neighborhood.id,
          name: classResult.teachingPlace.neighborhood.name,
          city: {
            id: classResult.teachingPlace.neighborhood.city.id,
            name: classResult.teachingPlace.neighborhood.city.name,
          },
          region: {
            id: classResult.teachingPlace.neighborhood.region.id,
            name: classResult.teachingPlace.neighborhood.region.name,
          },
          createdAt: classResult.teachingPlace.createdAt,
          updatedAt: classResult.teachingPlace.updatedAt,
        },
        createdAt: classResult.teachingPlace.neighborhood.createdAt,
        updatedAt: classResult.teachingPlace.neighborhood.updatedAt,
      },
      shift: {
        id: classResult.shift.id,
        name: classResult.shift.name,
      },
      option: {
        id: classResult.option.id,
        name: classResult.option.name,
      },
      status: {
        id: classResult.status.id,
        name: classResult.status.name,
      },
      createdAt: classResult.createdAt,
      updatedAt: classResult.updatedAt,
    }
  }
}

import { ClassEditionDetailsDto } from '../swagger/academic/entities/class-edition-details.dto'
import { ClassViewModel } from './class.view-model'

export class ClassEditionViewModel {
  static toHttp(classEdtiion: ClassEditionDetailsDto) {
    return {
      id: classEdtiion.id,
      class: ClassViewModel.toHttp(classEdtiion.class),
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

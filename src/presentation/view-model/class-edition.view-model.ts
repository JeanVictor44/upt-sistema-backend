import { ClassEditionDetailsDto } from '../swagger/academic/entities/class-edition-details.dto'
import { ClassViewModel } from './class.view-model'

export class ClassEditionViewModel {
  static toHttp(classEdtiion: ClassEditionDetailsDto) {
    return {
      id: classEdtiion.id,
      class: ClassViewModel.toHttp(classEdtiion.class),
      enrolledCount: classEdtiion.enrolledCount,
      edition: classEdtiion.edition,
      createdAt: classEdtiion.createdAt,
      updatedAt: classEdtiion.updatedAt,
    }
  }
}

import { Edition } from '@root/domain/edition/enterprise/entities/edition.entity'

export class EditionViewModel {
  static toHttp(edition: Edition) {
    return {
      id: edition.id,
      year: edition.year,
      createdAt: edition.createdAt,
      updatedAt: edition.updatedAt,
    }
  }
}

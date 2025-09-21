import { Edition } from '@domain/edition/enterprise/entities/edition.entity'

export abstract class EditionRepository {
  abstract create(edition: Edition): Promise<void>
  abstract findById(id: number): Promise<Edition | null>
  abstract findByYear(year: number): Promise<Edition | null>
  abstract findAll(): Promise<Edition[]>
}

import { Edition } from '@root/domain/academic/enterprise/entities/edition.entity'

export abstract class EditionRepository {
  abstract create(edition: Edition): Promise<void>
  abstract findById(id: number): Promise<Edition | null>
  abstract findByYear(year: number): Promise<Edition | null>
  abstract findAll(): Promise<Edition[]>
  abstract save(edition: Edition): Promise<void>
  abstract delete(id: number): Promise<void>
}

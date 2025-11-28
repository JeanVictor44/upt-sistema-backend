import { User } from '@root/domain/authentication/enterprise/entities/user.entity'

export class UserViewModel {
  static toHttpWithDetails(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      document: user.document,
      telephone: user.telephone,
      role: {
        id: user.role?.id,
        name: user.role?.name,
      },
      classEdition: {
        id: user.classEdition?.id,
        name: user.classEdition?.name,
        year: user.classEdition?.year,
      },
      region: {
        id: user.region?.id,
        name: user.region?.name,
      },
      rolesHistory:
        user.rolesHistory?.map((roleHistoryItem) => ({
          role: roleHistoryItem?.role,
          classEdition: roleHistoryItem?.classEdition
            ? {
                id: roleHistoryItem.classEdition.id,
                name: roleHistoryItem.classEdition.name,
                year: roleHistoryItem.classEdition.year,
              }
            : undefined,
          region: roleHistoryItem.region
            ? {
                id: roleHistoryItem.region.id,
                name: roleHistoryItem.region.name,
              }
            : undefined,
          startDate: roleHistoryItem.startDate,
          endDate: roleHistoryItem.endDate || undefined,
        })) || [],
      disabledAt: user.disabledAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      document: user.document,
      telephone: user.telephone,
      disabledAt: user.disabledAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}

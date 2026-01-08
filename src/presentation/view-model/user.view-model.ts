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
      teachingPlace: {
        id: user.teachingPlace?.id,
        name: user.teachingPlace?.name,
      },
      region: {
        id: user.region?.id,
        name: user.region?.name,
      },
      rolesHistory:
        user.rolesHistory?.map((roleHistoryItem) => ({
          role: roleHistoryItem?.role,
          teachingPlace: roleHistoryItem?.teachingPlace
            ? {
                id: roleHistoryItem.teachingPlace.id,
                name: roleHistoryItem.teachingPlace.name,
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

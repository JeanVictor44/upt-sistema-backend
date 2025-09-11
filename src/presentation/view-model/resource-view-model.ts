import { Resource } from '@root/core/domain/resource'

export class ResourceViewModel {
  static toHttp<T>(resource: Resource<T>) {
    return {
      id: resource.id,
      name: resource.name,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    }
  }
}

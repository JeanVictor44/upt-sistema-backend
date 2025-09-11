interface ResourceProps<MapName> {
  id?: number
  name: MapName
  createdAt?: Date
  updatedAt?: Date
}

export class Resource<MapName> {
  private _id: number
  private _name: MapName
  private _createdAt: Date
  private _updatedAt: Date

  public get name() {
    return this._name
  }

  public get createdAt() {
    return this._createdAt
  }

  public get updatedAt() {
    return this._updatedAt
  }

  public get id() {
    return this._id
  }

  protected constructor(props: ResourceProps<MapName>, id?: number) {
    if (typeof id === 'number') this._id = id
    this._name = props.name
    this._createdAt = props.createdAt ?? new Date()
    this._updatedAt = props.updatedAt ?? new Date()
  }

  static create<MapName>(props: ResourceProps<MapName>) {
    return new Resource(
      {
        name: props.name,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      props.id,
    )
  }
}

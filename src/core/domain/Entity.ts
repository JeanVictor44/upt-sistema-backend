export abstract class Entity<T> {
  protected _id: number
  public props: T

  public get id() {
    return this._id
  }

  protected constructor(props: T, id?: number) {
    this.props = props
    if (id) this._id = id
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!(object instanceof Entity)) {
      return false
    }

    return this._id === object._id
  }
}

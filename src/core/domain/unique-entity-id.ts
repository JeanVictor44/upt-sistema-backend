import { v4 as uuidv4 } from 'uuid'

export class UniqueEntityID {
  private value: string

  toValue() {
    return this.value
  }

  toString() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? uuidv4()
  }
  public equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}

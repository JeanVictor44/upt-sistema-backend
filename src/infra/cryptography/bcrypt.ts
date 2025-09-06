import { compare, hash } from 'bcryptjs'

import { HashGenerator } from '@domain/authentication/applications/cryptography/hash-generator'

export class Bcrypt implements HashGenerator {
  private HASH_SALT_LENGTH = 8

  hash(password: string): Promise<string> {
    return hash(password, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed)
  }
}

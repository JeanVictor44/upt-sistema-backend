import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { EncryptProps, Encrypter } from '@domain/authentication/applications/cryptography/encrypter'

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private readonly jwtService: JwtService) {}

  encrypt({ payload, expiresIn }: EncryptProps): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn,
    })
  }
}

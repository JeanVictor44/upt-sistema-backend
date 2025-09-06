export type EncryptProps = {
  payload: Record<string, string>
  expiresIn?: string | number
}

export abstract class Encrypter {
  abstract encrypt(data: EncryptProps): Promise<string>
}

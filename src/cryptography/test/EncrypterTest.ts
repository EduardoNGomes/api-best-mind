import { Encrypter } from '../Encrypter'

export class EncrypterTest implements Encrypter {
  async encrypt(payload: Record<string, unknown>) {
    return JSON.stringify(payload)
  }
}

import { app } from '@/server'
import { Encrypter } from '../Encrypter'

export class EncrypterJWT implements Encrypter {
  async encrypt(payload: Record<string, unknown>) {
    return app.jwt.sign(payload, { expiresIn: '1d' })
  }
}

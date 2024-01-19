import { Comparer } from '../comparer'
import { Hasher } from '../hasher'

export class HasherTest implements Hasher, Comparer {
  async hash(plain: string) {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string) {
    return plain.concat('-hashed') === hash
  }
}

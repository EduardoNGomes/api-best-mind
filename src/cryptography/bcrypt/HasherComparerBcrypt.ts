import { Comparer } from '../comparer'
import { Hasher } from '../hasher'
import { compare, hash } from 'bcrypt'

export class HasherComparerBcrypt implements Hasher, Comparer {
  number_of_rounds = 8

  async hash(plain: string) {
    return await hash(plain, this.number_of_rounds)
  }

  async compare(plain: string, hash: string) {
    return await compare(plain, hash)
  }
}

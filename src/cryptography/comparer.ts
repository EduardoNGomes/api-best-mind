export abstract class Comparer {
  abstract compare(plain: string): Promise<string>
}

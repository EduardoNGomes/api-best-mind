export abstract class Uploader {
  abstract save(filename: string): Promise<string>
  abstract delete(filename: string): Promise<void>
}

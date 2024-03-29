export abstract class Uploader {
  abstract save(filename: string): Promise<string | null>
  abstract delete(filename: string): Promise<void>
}

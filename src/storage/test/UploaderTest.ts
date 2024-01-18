import { Uploader } from '../uploader'

export class UploaderTest implements Uploader {
  items: string[] = []

  async save(filename: string): Promise<string> {
    this.items.push(filename)
    return filename
  }

  async delete(filename: string): Promise<void> {
    this.items = this.items.filter((item) => item !== filename)
  }
}

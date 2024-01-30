import fs from 'fs'
import path from 'path'
import { Uploader } from '../uploader'
import { TMP_FOLDER, UPLOADS_FOLDER } from '@/config/multer'

export class UploaderMulter implements Uploader {
  async save(filename: string) {
    try {
      await fs.promises.rename(
        path.resolve(TMP_FOLDER, filename),
        path.resolve(UPLOADS_FOLDER, filename),
      )
      return filename
    } catch {
      return null
    }
  }

  async delete(filename: string) {
    const filePath = path.resolve(UPLOADS_FOLDER, filename)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

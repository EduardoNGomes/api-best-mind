import multer from 'fastify-multer'
import { resolve } from 'path'
import crypto from 'crypto'

export const TMP_FOLDER = resolve(__dirname, '..', '..', 'tmp')
export const UPLOADS_FOLDER = resolve(TMP_FOLDER, 'uploads')

export const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const filename = `${fileHash}-${file.originalname}`
      return cb(null, filename)
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 6, // 6 megabytes em bytes
  },
}

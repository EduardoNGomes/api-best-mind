import { config } from 'dotenv'

import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const prisma = new PrismaClient()

beforeEach(async () => {
  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "test" `)

  execSync('pnpm migrate')
})

afterEach(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "test" CASCADE`)

  await prisma.$disconnect()
})

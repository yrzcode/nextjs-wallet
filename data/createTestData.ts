import { PrismaClient} from '@prisma/client'
import { userData } from './users'

const prisma = new PrismaClient()

const createTestData = async () => {
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }
}

createTestData()
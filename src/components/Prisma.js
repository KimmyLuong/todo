import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getStuff() {

    console.log('hola')

    const allUsers = await prisma.user.findMany({
        include: { posts: true },
      })
      // use `console.dir` to print nested objects
      console.dir(allUsers, { depth: null })

    await prisma.$disconnect()
}

export {
    getStuff
}

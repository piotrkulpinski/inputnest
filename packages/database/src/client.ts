import { remember } from "@epic-web/remember"
import { Client } from "@planetscale/database"
import { PrismaPlanetScale } from "@prisma/adapter-planetscale"
import { Prisma, PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

export const getPrisma = (url: string) =>
  remember("db", () => {
    const connection = new Client({ url })
    const adapter = new PrismaPlanetScale(connection)
    return new PrismaClient({ datasourceUrl: url, adapter }).$extends(withAccelerate())
  })

export const isPrismaError = (error: unknown): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError
}

import { Prisma, PrismaClient } from "@prisma/client"
import { remember } from "@epic-web/remember"

export const db = remember('prisma', () => {
  return new PrismaClient()
})

export const isPrismaError = (error: unknown): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError
}

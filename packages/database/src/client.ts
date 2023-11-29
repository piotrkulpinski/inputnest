import { remember } from "@epic-web/remember"
import { Prisma, PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'

export const db = remember("db", () => {
  return new PrismaClient({
    datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiOTE0OWRjMDktZjQxYS00NWFmLTk5NWEtYzgyYjIyYjZmY2NhIiwidGVuYW50X2lkIjoiZmY5ZTA3MWY5NjY4MzRkZTkwNDNkNjQzN2I5ZWM4OTFiMWU2ODFmNmMwNGNhOWQ0MjQzYjg5MmQ3MWRhMGUxMyIsImludGVybmFsX3NlY3JldCI6IjFlZDlkMTZjLWMyN2YtNDcyNC05ODc1LWU0YWJkNzY3NDgwMCJ9.vwm-JStWvhNCnvg7SHdpikHydigz_JNLMGelyJQmgLY",
  }).$extends(withAccelerate())
})

export const isPrismaError = (error: unknown): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError
}

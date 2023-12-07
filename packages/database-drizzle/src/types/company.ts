import { Prisma } from "@prisma/client"

export const companyInclude = {
  domain: true,
  subscription: true,
  members: {
    where: { role: { in: ["Owner", "Manager"] } },
    include: { user: true },
  },
} satisfies Prisma.CompanyDefaultArgs["include"]

const companyWithMembers = Prisma.validator<Prisma.CompanyDefaultArgs>()({
  include: companyInclude,
})

export type CompanyWithMembers = Prisma.CompanyGetPayload<typeof companyWithMembers>

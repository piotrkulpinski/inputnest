import { Prisma } from "@prisma/client"

export const workspaceInclude = {
  subscription: true,
  members: {
    where: { role: { in: ["Owner", "Manager"] } },
    include: { user: true },
  },
} satisfies Prisma.WorkspaceDefaultArgs["include"]

const workspaceWithMembers = Prisma.validator<Prisma.WorkspaceDefaultArgs>()({
  include: workspaceInclude,
})

export type WorkspaceWithMembers = Prisma.WorkspaceGetPayload<typeof workspaceWithMembers>

"use client"

import { Button, Card, Dialog, Header, Paragraph, Series } from "@curiousleaf/design"
import { PlusIcon } from "lucide-react"
import { useState, useEffect } from "react"

import { BoardForm } from "~/app/app/[company]/settings/boards/BoardForm"
import { BoardItem } from "~/app/app/[company]/settings/boards/BoardItem"
import { Skeleton } from "~/components/interface/Skeleton"
import { HeadingCounter } from "~/components/utils/HeadingCounter"
import { QueryCell } from "~/components/utils/QueryCell"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useCompany } from "~/providers/CompanyProvider"
import { SortableProvider } from "~/providers/SortableProvider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

export default function Route() {
  const apiUtils = api.useUtils()
  const { id: companyId } = useCompany()
  const { handleSuccess } = useMutationHandler()
  const [boards, setBoards] = useState<RouterOutputs["boards"]["getAll"]>([])

  const boardsQuery = api.boards.getAll.useQuery({ companyId })

  const { mutate: reorderBoards } = api.boards.reorder.useMutation({
    onSuccess: async () => {
      handleSuccess({ success: "Boards reordered successfully" })

      // Invalidate the boards cache
      await apiUtils.boards.getAll.invalidate({ companyId })
    },
  })

  const move = (ids: string[]) => {
    setBoards(boards.slice().sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)))

    // Update the order of the boards
    reorderBoards({ ids })
  }

  // Update the boards when the loader data changes
  useEffect(() => {
    boardsQuery.isSuccess && setBoards(boardsQuery.data)
  }, [boardsQuery.isSuccess, boardsQuery.data])

  return (
    <Card>
      <Card.Panel asChild>
        <Header
          title={<HeadingCounter data={boardsQuery.data}>Boards</HeadingCounter>}
          description="Manage the boards where you and your users can submit feedback."
        >
          <Dialog>
            <Dialog.Trigger asChild>
              <Button theme="secondary" prefix={<PlusIcon />}>
                Create Board
              </Button>
            </Dialog.Trigger>

            <BoardForm />
          </Dialog>
        </Header>
      </Card.Panel>

      <Card.Panel>
        <Series size="lg" direction="column">
          <QueryCell
            query={boardsQuery}
            loading={() => Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
            error={() => (
              <Paragraph className="text-red">There was an error loading the boards.</Paragraph>
            )}
            empty={() => (
              <Paragraph className="text-gray-600">No boards added for this company yet.</Paragraph>
            )}
            success={() => (
              <SortableProvider items={boards.map(({ id }) => id)} onDragEnd={move}>
                {boards.map(board => (
                  <BoardItem key={board.id} board={board} />
                ))}
              </SortableProvider>
            )}
          />
        </Series>
      </Card.Panel>
    </Card>
  )
}

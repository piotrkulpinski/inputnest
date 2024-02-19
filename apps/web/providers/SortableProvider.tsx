import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToParentElement } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable as useDNDSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import type { Arguments } from "@dnd-kit/sortable/dist/hooks/useSortable"
import { CSS } from "@dnd-kit/utilities"
import { useId } from "react"
import type { ComponentPropsWithRef, CSSProperties } from "react"

export type SortableProviderProps = Omit<ComponentPropsWithRef<typeof DndContext>, "onDragEnd"> & {
  items: UniqueIdentifier[]
  onDragEnd: (items: string[]) => void
}

export const SortableProvider = ({
  children,
  items,
  onDragEnd,
  ...props
}: SortableProviderProps) => {
  const contextId = useId()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeIndex = active.data.current?.sortable.index
    const overIndex = over?.data.current?.sortable.index

    if (activeIndex !== overIndex) {
      const newItems = arrayMove(items, activeIndex, overIndex)
      onDragEnd(newItems as string[])
    }
  }

  return (
    <DndContext
      id={contextId}
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement]}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragEnd={handleDragEnd}
      {...props}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export const useSortable = (props: Arguments) => {
  const { isDragging, transform, transition, setNodeRef: ref, ...sortable } = useDNDSortable(props)

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  }

  return {
    ref,
    style,
    isDragging,
    ...sortable,
  }
}

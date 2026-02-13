import { useId } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useResumeStore } from '../../stores/resume-store'
import type { Entry } from '../../types/resume'

interface SortableEntryListProps {
  sectionId: string
  entries: Entry[]
  children: React.ReactNode
}

export function SortableEntryList({ sectionId, entries, children }: SortableEntryListProps) {
  const id = useId()
  const reorderEntries = useResumeStore((s) => s.reorderEntries)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = entries.findIndex((e) => e.id === active.id)
    const newIndex = entries.findIndex((e) => e.id === over.id)
    reorderEntries(sectionId, oldIndex, newIndex)
  }

  return (
    <DndContext id={id} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={entries.map((e) => e.id)} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export function useSortableEntry(entryId: string) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: entryId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return { attributes, listeners, setNodeRef, style, isDragging }
}

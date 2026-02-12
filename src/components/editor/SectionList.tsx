import { ChevronDown, ChevronRight, Eye, EyeOff, Trash2, GripVertical, PanelLeft, PanelRight } from 'lucide-react'
import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
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
import { SummaryForm } from './SummaryForm'
import { ExperienceForm } from './ExperienceForm'
import { EducationForm } from './EducationForm'
import { SkillsForm } from './SkillsForm'
import { ReferencesForm } from './ReferencesForm'
import type { Section } from '../../types/resume'

function SectionContent({ section }: { section: Section }) {
  switch (section.type) {
    case 'summary':
      return <SummaryForm section={section} />
    case 'experience':
    case 'projects':
    case 'certifications':
    case 'custom':
      return <ExperienceForm section={section} />
    case 'education':
      return <EducationForm section={section} />
    case 'skills':
    case 'languages':
      return <SkillsForm section={section} />
    case 'references':
      return <ReferencesForm section={section} />
    default:
      return <ExperienceForm section={section} />
  }
}

const defaultColumnByType: Record<string, 'left' | 'right'> = {
  summary: 'left',
  experience: 'left',
  projects: 'left',
  certifications: 'left',
  custom: 'left',
  education: 'right',
  skills: 'right',
  languages: 'right',
  references: 'right',
}

function SortableSection({ section }: { section: Section }) {
  const [expanded, setExpanded] = useState(true)
  const template = useResumeStore((s) => s.resume.settings.template)
  const toggleSectionVisibility = useResumeStore((s) => s.toggleSectionVisibility)
  const removeSection = useResumeStore((s) => s.removeSection)
  const updateSection = useResumeStore((s) => s.updateSection)

  const isExecutive = template === 'executive'
  const column = section.column || defaultColumnByType[section.type] || 'left'

  const toggleColumn = () => {
    updateSection(section.id, { column: column === 'left' ? 'right' : 'left' })
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center gap-2 px-4 py-3">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={16} />
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-gray-600"
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        <h3
          className="flex-1 text-sm font-medium text-gray-700 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {section.title}
        </h3>

        {isExecutive && (
          <button
            onClick={toggleColumn}
            className="flex items-center gap-1 px-1.5 py-0.5 text-xs text-gray-500 hover:text-primary hover:bg-primary/5 rounded transition-colors"
            title={column === 'left' ? 'Mover a columna derecha' : 'Mover a columna izquierda'}
          >
            {column === 'left' ? <PanelLeft size={13} /> : <PanelRight size={13} />}
            <span>{column === 'left' ? 'Izq' : 'Der'}</span>
          </button>
        )}

        <button
          onClick={() => toggleSectionVisibility(section.id)}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title={section.visible ? 'Ocultar sección' : 'Mostrar sección'}
        >
          {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>

        <button
          onClick={() => removeSection(section.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          title="Eliminar sección"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4">
          <SectionContent section={section} />
        </div>
      )}
    </div>
  )
}

export function SectionList() {
  const sections = useResumeStore((s) => s.resume.sections)
  const reorderSections = useResumeStore((s) => s.reorderSections)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = sections.findIndex((s) => s.id === active.id)
    const newIndex = sections.findIndex((s) => s.id === over.id)
    reorderSections(oldIndex, newIndex)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {sections.map((section) => (
            <SortableSection key={section.id} section={section} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

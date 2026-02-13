import { Plus, Trash2, GripVertical } from 'lucide-react'
import { useResumeStore } from '../../stores/resume-store'
import { SortableEntryList, useSortableEntry } from './SortableEntryList'
import type { Section, Entry } from '../../types/resume'

interface ReferencesFormProps {
  section: Section
}

function ReferenceEntry({ section, entry }: { section: Section; entry: Entry }) {
  const updateEntry = useResumeStore((s) => s.updateEntry)
  const removeEntry = useResumeStore((s) => s.removeEntry)
  const { attributes, listeners, setNodeRef, style } = useSortableEntry(entry.id)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50/50"
    >
      <div className="flex items-start justify-between gap-2">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={14} />
        </button>
        <div className="flex-1 space-y-3">
          <input
            type="text"
            value={entry.title}
            onChange={(e) =>
              updateEntry(section.id, entry.id, { title: e.target.value })
            }
            placeholder="Nombre completo"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <input
            type="text"
            value={entry.organization}
            onChange={(e) =>
              updateEntry(section.id, entry.id, { organization: e.target.value })
            }
            placeholder="Empresa / Cargo"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={entry.startDate}
              onChange={(e) =>
                updateEntry(section.id, entry.id, { startDate: e.target.value })
              }
              placeholder="Teléfono"
              className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <input
              type="text"
              value={entry.endDate}
              onChange={(e) =>
                updateEntry(section.id, entry.id, { endDate: e.target.value })
              }
              placeholder="Email"
              className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
        <button
          onClick={() => removeEntry(section.id, entry.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

export function ReferencesForm({ section }: ReferencesFormProps) {
  const addEntry = useResumeStore((s) => s.addEntry)

  return (
    <div className="space-y-4">
      <SortableEntryList sectionId={section.id} entries={section.entries}>
        {section.entries.map((entry) => (
          <ReferenceEntry key={entry.id} section={section} entry={entry} />
        ))}
      </SortableEntryList>

      <button
        onClick={() => addEntry(section.id)}
        className="w-full flex items-center justify-center gap-1.5 py-2 text-sm text-primary hover:bg-primary/5 border border-dashed border-primary/30 rounded-lg transition-colors"
      >
        <Plus size={14} />
        Agregar referencia
      </button>
    </div>
  )
}

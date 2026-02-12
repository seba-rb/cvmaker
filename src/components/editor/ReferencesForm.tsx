import { Plus, Trash2 } from 'lucide-react'
import { useResumeStore } from '../../stores/resume-store'
import type { Section } from '../../types/resume'

interface ReferencesFormProps {
  section: Section
}

export function ReferencesForm({ section }: ReferencesFormProps) {
  const updateEntry = useResumeStore((s) => s.updateEntry)
  const addEntry = useResumeStore((s) => s.addEntry)
  const removeEntry = useResumeStore((s) => s.removeEntry)

  return (
    <div className="space-y-4">
      {section.entries.map((entry) => (
        <div
          key={entry.id}
          className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50/50"
        >
          <div className="flex items-start justify-between gap-2">
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
      ))}

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

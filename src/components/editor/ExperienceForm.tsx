import { Plus, Trash2, GripVertical } from 'lucide-react'
import { useResumeStore } from '../../stores/resume-store'
import { AIButton } from '../ai/AIButton'
import { improveBulletPoints } from '../../services/gemini'
import type { Section } from '../../types/resume'

interface ExperienceFormProps {
  section: Section
}

export function ExperienceForm({ section }: ExperienceFormProps) {
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
            <div className="flex items-center gap-1 text-gray-300">
              <GripVertical size={14} />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              <input
                type="text"
                value={entry.title}
                onChange={(e) =>
                  updateEntry(section.id, entry.id, { title: e.target.value })
                }
                placeholder="Puesto / Cargo"
                className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                type="text"
                value={entry.organization}
                onChange={(e) =>
                  updateEntry(section.id, entry.id, { organization: e.target.value })
                }
                placeholder="Empresa"
                className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <button
              onClick={() => removeEntry(section.id, entry.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              value={entry.location}
              onChange={(e) =>
                updateEntry(section.id, entry.id, { location: e.target.value })
              }
              placeholder="Ubicación"
              className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <input
              type="text"
              value={entry.startDate}
              onChange={(e) =>
                updateEntry(section.id, entry.id, { startDate: e.target.value })
              }
              placeholder="Inicio (MM/YYYY)"
              className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={entry.current ? 'Presente' : entry.endDate}
                onChange={(e) =>
                  updateEntry(section.id, entry.id, {
                    endDate: e.target.value,
                    current: false,
                  })
                }
                disabled={entry.current}
                placeholder="Fin (MM/YYYY)"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-100 disabled:text-gray-500"
              />
              <label className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                <input
                  type="checkbox"
                  checked={entry.current}
                  onChange={(e) =>
                    updateEntry(section.id, entry.id, {
                      current: e.target.checked,
                      endDate: e.target.checked ? '' : entry.endDate,
                    })
                  }
                  className="rounded accent-primary"
                />
                Actual
              </label>
            </div>
          </div>

          <div>
            <textarea
              value={entry.description}
              onChange={(e) =>
                updateEntry(section.id, entry.id, { description: e.target.value })
              }
              placeholder="Describe tus logros y responsabilidades. Usa viñetas con • al inicio de cada línea."
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
            {entry.description && (
              <div className="flex justify-end mt-1">
                <AIButton
                  label="Mejorar con AI"
                  onGenerate={() => improveBulletPoints(entry.description, entry.title)}
                  onAccept={(text) => updateEntry(section.id, entry.id, { description: text })}
                />
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={() => addEntry(section.id)}
        className="w-full flex items-center justify-center gap-1.5 py-2 text-sm text-primary hover:bg-primary/5 border border-dashed border-primary/30 rounded-lg transition-colors"
      >
        <Plus size={14} />
        Agregar {section.type === 'experience' ? 'experiencia' : 'entrada'}
      </button>
    </div>
  )
}

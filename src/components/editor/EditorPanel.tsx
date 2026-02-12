import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useResumeStore } from '../../stores/resume-store'
import { ContactForm } from './ContactForm'
import { SectionList } from './SectionList'
import { SettingsBar } from '../settings/SettingsBar'
import type { SectionType } from '../../types/resume'

const addableSections: { type: SectionType; label: string }[] = [
  { type: 'summary', label: 'Resumen' },
  { type: 'experience', label: 'Experiencia' },
  { type: 'education', label: 'Educación' },
  { type: 'skills', label: 'Habilidades' },
  { type: 'projects', label: 'Proyectos' },
  { type: 'languages', label: 'Idiomas' },
  { type: 'certifications', label: 'Certificaciones' },
  { type: 'references', label: 'Referencias' },
  { type: 'custom', label: 'Sección personalizada' },
]

export function EditorPanel() {
  const addSection = useResumeStore((s) => s.addSection)
  const [showAddMenu, setShowAddMenu] = useState(false)

  const handleAddSection = (type: SectionType, label: string) => {
    addSection(type, label)
    setShowAddMenu(false)
  }

  return (
    <div className="p-6 space-y-6">
      <SettingsBar />

      <div className="border border-gray-200 rounded-lg bg-white p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Información de contacto</h3>
        <ContactForm />
      </div>

      <SectionList />

      <div className="relative">
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 border border-dashed border-gray-300 hover:border-primary/30 rounded-lg transition-colors"
        >
          <Plus size={14} />
          Agregar sección
        </button>

        {showAddMenu && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
            {addableSections.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => handleAddSection(type, label)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

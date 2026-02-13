import { useState, type KeyboardEvent } from 'react'
import { Plus, Trash2, GripVertical, X } from 'lucide-react'
import { useResumeStore } from '../../stores/resume-store'
import { AIButton } from '../ai/AIButton'
import { improveBulletPoints } from '../../services/gemini'
import { SortableEntryList, useSortableEntry } from './SortableEntryList'
import type { Section, Entry } from '../../types/resume'

interface ProjectsFormProps {
  section: Section
}

function ProjectEntry({ section, entry }: { section: Section; entry: Entry }) {
  const updateEntry = useResumeStore((s) => s.updateEntry)
  const removeEntry = useResumeStore((s) => s.removeEntry)
  const { attributes, listeners, setNodeRef, style } = useSortableEntry(entry.id)
  const [skillInput, setSkillInput] = useState('')

  const addSkill = (value: string) => {
    const trimmed = value.trim()
    if (trimmed && !entry.skills.includes(trimmed)) {
      updateEntry(section.id, entry.id, { skills: [...entry.skills, trimmed] })
    }
    setSkillInput('')
  }

  const removeSkill = (skill: string) => {
    updateEntry(section.id, entry.id, { skills: entry.skills.filter((s) => s !== skill) })
  }

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill(skillInput)
    } else if (e.key === 'Backspace' && !skillInput && entry.skills.length > 0) {
      removeSkill(entry.skills[entry.skills.length - 1])
    }
  }

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
            placeholder="Nombre del proyecto"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <input
            type="url"
            value={entry.url || ''}
            onChange={(e) =>
              updateEntry(section.id, entry.id, { url: e.target.value })
            }
            placeholder="https://miproyecto.com"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button
          onClick={() => removeEntry(section.id, entry.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div>
        <textarea
          value={entry.description}
          onChange={(e) =>
            updateEntry(section.id, entry.id, { description: e.target.value })
          }
          placeholder="Describe el proyecto, sus objetivos y tu rol."
          rows={3}
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

      <div>
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-md focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary min-h-[38px]">
          {entry.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-red-500 transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            onBlur={() => { if (skillInput.trim()) addSkill(skillInput) }}
            placeholder={entry.skills.length === 0 ? 'Tecnologías (Enter para agregar)' : ''}
            className="flex-1 min-w-[120px] text-sm outline-none bg-transparent"
          />
        </div>
      </div>
    </div>
  )
}

export function ProjectsForm({ section }: ProjectsFormProps) {
  const addEntry = useResumeStore((s) => s.addEntry)

  return (
    <div className="space-y-4">
      <SortableEntryList sectionId={section.id} entries={section.entries}>
        {section.entries.map((entry) => (
          <ProjectEntry key={entry.id} section={section} entry={entry} />
        ))}
      </SortableEntryList>

      <button
        onClick={() => addEntry(section.id)}
        className="w-full flex items-center justify-center gap-1.5 py-2 text-sm text-primary hover:bg-primary/5 border border-dashed border-primary/30 rounded-lg transition-colors"
      >
        <Plus size={14} />
        Agregar proyecto
      </button>
    </div>
  )
}

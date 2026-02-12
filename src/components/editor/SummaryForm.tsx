import { useResumeStore } from '../../stores/resume-store'
import { AIButton } from '../ai/AIButton'
import { generateSummary } from '../../services/gemini'
import type { Section } from '../../types/resume'

interface SummaryFormProps {
  section: Section
}

export function SummaryForm({ section }: SummaryFormProps) {
  const updateEntry = useResumeStore((s) => s.updateEntry)
  const resume = useResumeStore((s) => s.resume)
  const entry = section.entries[0]

  if (!entry) return null

  const experienceSection = resume.sections.find((s) => s.type === 'experience')
  const skillsSection = resume.sections.find((s) => s.type === 'skills')
  const latestJob = experienceSection?.entries[0]?.title || ''
  const allSkills = skillsSection?.entries[0]?.skills || []

  return (
    <div>
      <textarea
        value={entry.description}
        onChange={(e) => updateEntry(section.id, entry.id, { description: e.target.value })}
        placeholder="Escribe un breve resumen profesional..."
        rows={4}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
      />
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-gray-400">
          2-3 oraciones que resuman tu experiencia y objetivos profesionales.
        </p>
        <AIButton
          label="Generar resumen"
          onGenerate={() => {
            const experience = experienceSection?.entries
              .map((e) => `${e.title} en ${e.organization}`)
              .join(', ') || ''
            return generateSummary(latestJob, experience, allSkills)
          }}
          onAccept={(text) => updateEntry(section.id, entry.id, { description: text })}
        />
      </div>
    </div>
  )
}

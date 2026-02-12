import { useState, useEffect } from 'react'
import { X, Plus, Sparkles, Loader2 } from 'lucide-react'
import { useResumeStore } from '../../stores/resume-store'
import { hasApiKey, suggestSkills } from '../../services/gemini'
import type { Section } from '../../types/resume'

interface SkillsFormProps {
  section: Section
}

export function SkillsForm({ section }: SkillsFormProps) {
  const updateEntry = useResumeStore((s) => s.updateEntry)
  const addEntry = useResumeStore((s) => s.addEntry)
  const resume = useResumeStore((s) => s.resume)
  const [inputValue, setInputValue] = useState('')
  const [suggesting, setSuggesting] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const entry = section.entries[0]

  useEffect(() => {
    if (!entry) addEntry(section.id)
  }, [entry, section.id, addEntry])

  if (!entry) return null

  const skills = entry.skills || []

  const addSkill = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || skills.includes(trimmed)) return
    updateEntry(section.id, entry.id, { skills: [...skills, trimmed] })
    setInputValue('')
  }

  const removeSkill = (skill: string) => {
    updateEntry(section.id, entry.id, {
      skills: skills.filter((s) => s !== skill),
    })
  }

  const addSuggested = (skill: string) => {
    if (!skills.includes(skill)) {
      updateEntry(section.id, entry.id, { skills: [...skills, skill] })
    }
    setSuggestions((prev) => prev.filter((s) => s !== skill))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const handleSuggest = async () => {
    const experienceSection = resume.sections.find((s) => s.type === 'experience')
    const jobTitle = experienceSection?.entries[0]?.title || 'profesional'
    setSuggesting(true)
    try {
      const result = await suggestSkills(jobTitle, skills)
      setSuggestions(result.filter((s) => !skills.includes(s)))
    } catch {
      // silently fail
    }
    setSuggesting(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe una habilidad y presiona Enter"
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <button
          onClick={addSkill}
          disabled={!inputValue.trim()}
          className="px-3 py-2 text-sm text-primary hover:bg-primary/5 border border-primary/30 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
        </button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-sm bg-primary/5 text-primary border border-primary/10 rounded-md"
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
        </div>
      )}

      {hasApiKey() && (
        <div>
          <button
            onClick={handleSuggest}
            disabled={suggesting}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-purple-600 hover:bg-purple-50 rounded-md transition-colors disabled:opacity-50"
          >
            {suggesting ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            {suggesting ? 'Sugiriendo...' : 'Sugerir habilidades con AI'}
          </button>

          {suggestions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSuggested(skill)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-50 text-purple-600 border border-purple-100 rounded-md hover:bg-purple-100 transition-colors"
                >
                  <Plus size={10} />
                  {skill}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

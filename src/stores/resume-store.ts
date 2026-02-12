import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import type {
  Resume,
  ContactInfo,
  Section,
  Entry,
  ResumeSettings,
  SectionType,
} from '../types/resume'
import { defaultResume, createEntry, createSection } from '../utils/defaults'

interface ResumeStore {
  resume: Resume

  // Contact
  updateContact: (contact: Partial<ContactInfo>) => void

  // Settings
  updateSettings: (settings: Partial<ResumeSettings>) => void

  // Sections
  addSection: (type: SectionType, title: string) => void
  removeSection: (sectionId: string) => void
  updateSection: (sectionId: string, updates: Partial<Section>) => void
  reorderSections: (fromIndex: number, toIndex: number) => void
  toggleSectionVisibility: (sectionId: string) => void

  // Entries
  addEntry: (sectionId: string) => void
  removeEntry: (sectionId: string, entryId: string) => void
  updateEntry: (sectionId: string, entryId: string, updates: Partial<Entry>) => void
  reorderEntries: (sectionId: string, fromIndex: number, toIndex: number) => void

  // Resume
  loadResume: (resume: Resume) => void
  resetResume: () => void
}

function loadFromStorage(): Resume {
  try {
    const saved = localStorage.getItem('cvmaker-resume')
    if (saved) return JSON.parse(saved)
  } catch {
    // ignore
  }
  return defaultResume
}

function saveToStorage(resume: Resume) {
  try {
    localStorage.setItem('cvmaker-resume', JSON.stringify(resume))
  } catch {
    // ignore
  }
}

function withTimestamp(resume: Resume): Resume {
  return { ...resume, updatedAt: new Date().toISOString() }
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: loadFromStorage(),

  updateContact: (contact) =>
    set((state) => {
      const resume = withTimestamp({
        ...state.resume,
        contact: { ...state.resume.contact, ...contact },
      })
      saveToStorage(resume)
      return { resume }
    }),

  updateSettings: (settings) =>
    set((state) => {
      const resume = withTimestamp({
        ...state.resume,
        settings: { ...state.resume.settings, ...settings },
      })
      saveToStorage(resume)
      return { resume }
    }),

  addSection: (type, title) =>
    set((state) => {
      const section = createSection({
        type,
        title,
        entries: type === 'skills' || type === 'languages' ? [createEntry()] : [],
      })
      const resume = withTimestamp({
        ...state.resume,
        sections: [...state.resume.sections, section],
      })
      saveToStorage(resume)
      return { resume }
    }),

  removeSection: (sectionId) =>
    set((state) => {
      const resume = withTimestamp({
        ...state.resume,
        sections: state.resume.sections.filter((s) => s.id !== sectionId),
      })
      saveToStorage(resume)
      return { resume }
    }),

  updateSection: (sectionId, updates) =>
    set((state) => {
      const resume = withTimestamp({
        ...state.resume,
        sections: state.resume.sections.map((s) =>
          s.id === sectionId ? { ...s, ...updates } : s
        ),
      })
      saveToStorage(resume)
      return { resume }
    }),

  reorderSections: (fromIndex, toIndex) =>
    set((state) => {
      const sections = [...state.resume.sections]
      const [moved] = sections.splice(fromIndex, 1)
      sections.splice(toIndex, 0, moved)
      const resume = withTimestamp({ ...state.resume, sections })
      saveToStorage(resume)
      return { resume }
    }),

  toggleSectionVisibility: (sectionId) =>
    set((state) => {
      const resume = withTimestamp({
        ...state.resume,
        sections: state.resume.sections.map((s) =>
          s.id === sectionId ? { ...s, visible: !s.visible } : s
        ),
      })
      saveToStorage(resume)
      return { resume }
    }),

  addEntry: (sectionId) =>
    set((state) => {
      const resume = withTimestamp({
        ...state.resume,
        sections: state.resume.sections.map((s) =>
          s.id === sectionId ? { ...s, entries: [...s.entries, createEntry()] } : s
        ),
      })
      saveToStorage(resume)
      return { resume }
    }),

  removeEntry: (sectionId, entryId) =>
    set((state) => {
      const resume = withTimestamp({
        ...state.resume,
        sections: state.resume.sections.map((s) =>
          s.id === sectionId
            ? { ...s, entries: s.entries.filter((e) => e.id !== entryId) }
            : s
        ),
      })
      saveToStorage(resume)
      return { resume }
    }),

  updateEntry: (sectionId, entryId, updates) =>
    set((state) => {
      const resume = withTimestamp({
        ...state.resume,
        sections: state.resume.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                entries: s.entries.map((e) =>
                  e.id === entryId ? { ...e, ...updates } : e
                ),
              }
            : s
        ),
      })
      saveToStorage(resume)
      return { resume }
    }),

  reorderEntries: (sectionId, fromIndex, toIndex) =>
    set((state) => {
      const resume = withTimestamp({
        ...state.resume,
        sections: state.resume.sections.map((s) => {
          if (s.id !== sectionId) return s
          const entries = [...s.entries]
          const [moved] = entries.splice(fromIndex, 1)
          entries.splice(toIndex, 0, moved)
          return { ...s, entries }
        }),
      })
      saveToStorage(resume)
      return { resume }
    }),

  loadResume: (resume) =>
    set(() => {
      const updated = withTimestamp({ ...resume, id: resume.id || uuid() })
      saveToStorage(updated)
      return { resume: updated }
    }),

  resetResume: () =>
    set(() => {
      const resume = { ...defaultResume, id: uuid(), updatedAt: new Date().toISOString() }
      saveToStorage(resume)
      return { resume }
    }),
}))

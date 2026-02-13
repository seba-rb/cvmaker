export type TemplateType = 'classic' | 'modern' | 'clean' | 'executive'

export type FontFamily = 'inter' | 'montserrat' | 'calibri' | 'garamond' | 'georgia' | 'arial'

export type FontSize = 'small' | 'medium' | 'large'

export type PageSize = 'letter' | 'a4'

export type SectionType =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'projects'
  | 'certifications'
  | 'references'
  | 'custom'

export interface ResumeSettings {
  template: TemplateType
  font: FontFamily
  accentColor: string
  fontSize: FontSize
  pageSize: PageSize
}

export interface ContactInfo {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
}

export interface Entry {
  id: string
  title: string
  url: string
  organization: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  skills: string[]
}

export interface Section {
  id: string
  type: SectionType
  title: string
  visible: boolean
  column?: 'left' | 'right'
  entries: Entry[]
}

export interface Resume {
  id: string
  title: string
  updatedAt: string
  settings: ResumeSettings
  contact: ContactInfo
  sections: Section[]
}

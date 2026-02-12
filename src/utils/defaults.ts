import { v4 as uuid } from 'uuid'
import type { Resume, Entry, Section } from '../types/resume'

export function createEntry(overrides: Partial<Entry> = {}): Entry {
  return {
    id: uuid(),
    title: '',
    organization: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    skills: [],
    ...overrides,
  }
}

export function createSection(overrides: Partial<Section> = {}): Section {
  return {
    id: uuid(),
    type: 'custom',
    title: 'New Section',
    visible: true,
    entries: [],
    ...overrides,
  }
}

export const defaultResume: Resume = {
  id: uuid(),
  title: 'Mi CV',
  updatedAt: new Date().toISOString(),
  settings: {
    template: 'classic',
    font: 'inter',
    accentColor: '#2563eb',
    fontSize: 'medium',
    pageSize: 'letter',
  },
  contact: {
    fullName: 'María García López',
    email: 'maria.garcia@email.com',
    phone: '+52 55 1234 5678',
    location: 'Ciudad de México, México',
    linkedin: 'linkedin.com/in/mariagarcia',
    website: 'mariagarcia.dev',
  },
  sections: [
    createSection({
      type: 'summary',
      title: 'Resumen Profesional',
      entries: [
        createEntry({
          description:
            'Ingeniera de software con 5 años de experiencia desarrollando aplicaciones web escalables. Especializada en React, TypeScript y Node.js. Apasionada por crear productos que resuelvan problemas reales con código limpio y buenas prácticas.',
        }),
      ],
    }),
    createSection({
      type: 'experience',
      title: 'Experiencia Laboral',
      entries: [
        createEntry({
          title: 'Senior Frontend Developer',
          organization: 'TechCorp Solutions',
          location: 'Ciudad de México',
          startDate: '03/2022',
          endDate: '',
          current: true,
          description:
            '• Lideré la migración de una SPA legacy a React + TypeScript, reduciendo el tiempo de carga un 40%\n• Implementé un design system reutilizable usado por 3 equipos de producto\n• Mentoré a 4 desarrolladores junior en buenas prácticas de frontend',
        }),
        createEntry({
          title: 'Frontend Developer',
          organization: 'StartupMX',
          location: 'Guadalajara, México',
          startDate: '06/2019',
          endDate: '02/2022',
          current: false,
          description:
            '• Desarrollé la plataforma de e-commerce desde cero con React y Node.js, alcanzando 50K usuarios activos\n• Optimicé el rendimiento del sitio logrando un score de 95+ en Lighthouse\n• Integré pasarelas de pago (Stripe, PayPal) procesando +$2M en transacciones',
        }),
      ],
    }),
    createSection({
      type: 'education',
      title: 'Educación',
      entries: [
        createEntry({
          title: 'Ingeniería en Sistemas Computacionales',
          organization: 'Tecnológico de Monterrey',
          location: 'Monterrey, México',
          startDate: '08/2015',
          endDate: '06/2019',
          current: false,
          description: 'Graduada con honores. Especialización en Desarrollo de Software.',
        }),
      ],
    }),
    createSection({
      type: 'skills',
      title: 'Habilidades',
      entries: [
        createEntry({
          skills: [
            'React',
            'TypeScript',
            'JavaScript',
            'Node.js',
            'HTML/CSS',
            'Tailwind CSS',
            'Git',
            'REST APIs',
            'PostgreSQL',
            'Docker',
            'CI/CD',
            'Agile/Scrum',
          ],
        }),
      ],
    }),
  ],
}

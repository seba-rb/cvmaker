import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'
import { useResumeStore } from '../../stores/resume-store'

export function ContactForm() {
  const contact = useResumeStore((s) => s.resume.contact)
  const updateContact = useResumeStore((s) => s.updateContact)

  const fields = [
    { key: 'fullName' as const, label: 'Nombre completo', icon: User, placeholder: 'Juan Pérez' },
    { key: 'email' as const, label: 'Email', icon: Mail, placeholder: 'juan@email.com' },
    { key: 'phone' as const, label: 'Teléfono', icon: Phone, placeholder: '+52 55 1234 5678' },
    { key: 'location' as const, label: 'Ubicación', icon: MapPin, placeholder: 'Ciudad de México, México' },
    { key: 'linkedin' as const, label: 'LinkedIn', icon: Linkedin, placeholder: 'linkedin.com/in/juanperez' },
    { key: 'website' as const, label: 'Sitio web', icon: Globe, placeholder: 'juanperez.dev' },
  ]

  return (
    <div className="space-y-3">
      {fields.map(({ key, label, icon: Icon, placeholder }) => (
        <div key={key}>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1">
            <Icon size={12} />
            {label}
          </label>
          <input
            type="text"
            value={contact[key]}
            onChange={(e) => updateContact({ [key]: e.target.value })}
            placeholder={placeholder}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
      ))}
    </div>
  )
}

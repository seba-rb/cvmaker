import { useResumeStore } from '../../stores/resume-store'
import type { TemplateType, FontFamily, PageSize } from '../../types/resume'

const templates: { value: TemplateType; label: string }[] = [
  { value: 'classic', label: 'Clásico' },
  { value: 'modern', label: 'Moderno' },
  { value: 'clean', label: 'Limpio' },
  { value: 'executive', label: 'Ejecutivo' },
]

const fonts: { value: FontFamily; label: string }[] = [
  { value: 'inter', label: 'Inter' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'calibri', label: 'Calibri' },
  { value: 'garamond', label: 'Garamond' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'arial', label: 'Arial' },
]

const pageSizes: { value: PageSize; label: string }[] = [
  { value: 'letter', label: 'Carta' },
  { value: 'a4', label: 'A4' },
]

const accentColors = [
  '#2563eb', // blue
  '#059669', // emerald
  '#7c3aed', // violet
  '#dc2626', // red
  '#d97706', // amber
  '#0891b2', // cyan
  '#374151', // gray
  '#000000', // black
]

export function SettingsBar() {
  const settings = useResumeStore((s) => s.resume.settings)
  const updateSettings = useResumeStore((s) => s.updateSettings)

  return (
    <div className="flex flex-wrap items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-gray-500">Plantilla</label>
        <select
          value={settings.template}
          onChange={(e) => updateSettings({ template: e.target.value as TemplateType })}
          className="text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {templates.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-gray-500">Fuente</label>
        <select
          value={settings.font}
          onChange={(e) => updateSettings({ font: e.target.value as FontFamily })}
          className="text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {fonts.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-gray-500">Tamaño</label>
        <select
          value={settings.pageSize}
          onChange={(e) => updateSettings({ pageSize: e.target.value as PageSize })}
          className="text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {pageSizes.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-gray-500">Color</label>
        <div className="flex gap-1">
          {accentColors.map((color) => (
            <button
              key={color}
              onClick={() => updateSettings({ accentColor: color })}
              className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: color,
                borderColor: settings.accentColor === color ? color : 'transparent',
                boxShadow: settings.accentColor === color ? `0 0 0 2px white, 0 0 0 3px ${color}` : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

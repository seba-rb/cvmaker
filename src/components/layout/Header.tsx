import { FileDown, RotateCcw, Upload, Download, Sparkles } from 'lucide-react'
import { useResumeStore } from '../../stores/resume-store'
import { exportResumeJson, importResumeJson } from '../../services/storage'
import { hasApiKey } from '../../services/gemini'

interface HeaderProps {
  onExportPdf: () => void
  onOpenApiKey: () => void
}

export function Header({ onExportPdf, onOpenApiKey }: HeaderProps) {
  const resume = useResumeStore((s) => s.resume)
  const resetResume = useResumeStore((s) => s.resetResume)
  const loadResume = useResumeStore((s) => s.loadResume)

  const handleImport = async () => {
    try {
      const data = await importResumeJson()
      loadResume(data)
    } catch {
      // user cancelled or invalid file
    }
  }

  return (
    <header className="h-14 border-b border-gray-200 bg-white px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold text-gray-900">CVMaker</h1>
        <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">beta</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onOpenApiKey}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
          title="Configurar AI"
        >
          <Sparkles size={14} />
          {hasApiKey() ? 'AI' : 'Configurar AI'}
        </button>

        <button
          onClick={handleImport}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          title="Importar JSON"
        >
          <Upload size={14} />
        </button>

        <button
          onClick={() => exportResumeJson(resume)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          title="Exportar JSON"
        >
          <Download size={14} />
        </button>

        <button
          onClick={resetResume}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          title="Reiniciar"
        >
          <RotateCcw size={14} />
        </button>

        <button
          onClick={onExportPdf}
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-white bg-primary hover:bg-primary-hover rounded-md transition-colors ml-1"
        >
          <FileDown size={14} />
          Descargar PDF
        </button>
      </div>
    </header>
  )
}

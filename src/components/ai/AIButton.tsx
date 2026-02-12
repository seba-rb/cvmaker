import { useState } from 'react'
import { Sparkles, Loader2, Check, X } from 'lucide-react'
import { hasApiKey } from '../../services/gemini'

interface AIButtonProps {
  label?: string
  onGenerate: () => Promise<string>
  onAccept: (text: string) => void
}

export function AIButton({ label = 'Mejorar con AI', onGenerate, onAccept }: AIButtonProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'preview'>('idle')
  const [suggestion, setSuggestion] = useState('')
  const [error, setError] = useState('')

  if (!hasApiKey()) return null

  const handleGenerate = async () => {
    setState('loading')
    setError('')
    try {
      const result = await onGenerate()
      setSuggestion(result)
      setState('preview')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al generar')
      setState('idle')
    }
  }

  const handleAccept = () => {
    onAccept(suggestion)
    setState('idle')
    setSuggestion('')
  }

  const handleReject = () => {
    setState('idle')
    setSuggestion('')
  }

  if (state === 'loading') {
    return (
      <button
        disabled
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-purple-500 bg-purple-50 rounded-md"
      >
        <Loader2 size={12} className="animate-spin" />
        Generando...
      </button>
    )
  }

  if (state === 'preview') {
    return (
      <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <div className="flex items-center gap-1.5 text-xs font-medium text-purple-600 mb-2">
          <Sparkles size={12} />
          Sugerencia de AI
        </div>
        <div className="text-sm text-gray-700 whitespace-pre-line mb-3">{suggestion}</div>
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="flex items-center gap-1 px-3 py-1 text-xs text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
          >
            <Check size={12} />
            Aplicar
          </button>
          <button
            onClick={handleReject}
            className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={12} />
            Descartar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={handleGenerate}
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
      >
        <Sparkles size={12} />
        {label}
      </button>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

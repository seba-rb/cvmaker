import { useState } from 'react'
import { X, Key } from 'lucide-react'
import { getApiKey, setApiKey } from '../../services/gemini'

interface APIKeyModalProps {
  open: boolean
  onClose: () => void
}

export function APIKeyModal({ open, onClose }: APIKeyModalProps) {
  const [key, setKey] = useState(getApiKey())

  if (!open) return null

  const handleSave = () => {
    setApiKey(key.trim())
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Key size={18} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">API Key de Gemini</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Ingresa tu API key de Google AI Studio para usar las funciones de AI.
          Puedes obtener una gratis en{' '}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            aistudio.google.com/apikey
          </a>
        </p>

        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="AIza..."
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm text-white bg-primary hover:bg-primary-hover rounded-md transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

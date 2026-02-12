import { useState } from 'react'
import { Header } from './components/layout/Header'
import { EditorLayout } from './components/layout/EditorLayout'
import { EditorPanel } from './components/editor/EditorPanel'
import { ResumePreview } from './components/preview/ResumePreview'
import { APIKeyModal } from './components/settings/APIKeyModal'
import { exportToPdf } from './services/pdf'
import { useResumeStore } from './stores/resume-store'

function App() {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false)
  const pageSize = useResumeStore((s) => s.resume.settings.pageSize)

  return (
    <div className="h-screen flex flex-col">
      <Header
        onExportPdf={() => exportToPdf(pageSize)}
        onOpenApiKey={() => setApiKeyModalOpen(true)}
      />
      <EditorLayout
        editor={<EditorPanel />}
        preview={<ResumePreview />}
      />
      <APIKeyModal open={apiKeyModalOpen} onClose={() => setApiKeyModalOpen(false)} />
    </div>
  )
}

export default App

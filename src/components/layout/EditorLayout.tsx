import { type ReactNode } from 'react'

interface EditorLayoutProps {
  editor: ReactNode
  preview: ReactNode
}

export function EditorLayout({ editor, preview }: EditorLayoutProps) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-1/2 overflow-y-auto border-r border-gray-200 bg-white">
        {editor}
      </div>
      <div className="w-1/2 overflow-y-auto bg-gray-100 flex justify-center p-6">
        {preview}
      </div>
    </div>
  )
}

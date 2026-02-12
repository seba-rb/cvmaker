import { forwardRef } from 'react'
import { useResumeStore } from '../../stores/resume-store'
import { ClassicTemplate } from '../templates/ClassicTemplate'
import { ModernTemplate } from '../templates/ModernTemplate'
import { CleanTemplate } from '../templates/CleanTemplate'
import { ExecutiveTemplate } from '../templates/ExecutiveTemplate'
import type { Resume } from '../../types/resume'

const fontMap = {
  inter: '"Inter", system-ui, sans-serif',
  montserrat: '"Montserrat", system-ui, sans-serif',
  calibri: '"Calibri", "Gill Sans", sans-serif',
  garamond: '"EB Garamond", "Garamond", serif',
  georgia: '"Georgia", serif',
  arial: '"Arial", "Helvetica Neue", sans-serif',
}

const fontSizeScale = {
  small: 0.9,
  medium: 1,
  large: 1.1,
}

function TemplateRenderer({ resume }: { resume: Resume }) {
  switch (resume.settings.template) {
    case 'modern':
      return <ModernTemplate resume={resume} />
    case 'clean':
      return <CleanTemplate resume={resume} />
    case 'executive':
      return <ExecutiveTemplate resume={resume} />
    case 'classic':
    default:
      return <ClassicTemplate resume={resume} />
  }
}

export const ResumePreview = forwardRef<HTMLDivElement>((_props, ref) => {
  const resume = useResumeStore((s) => s.resume)
  const { font, fontSize, pageSize } = resume.settings

  const width = pageSize === 'a4' ? '210mm' : '216mm'
  const minHeight = pageSize === 'a4' ? '297mm' : '279mm'

  return (
    <div
      ref={ref}
      id="resume-preview"
      className="bg-white shadow-lg"
      style={{
        width,
        minHeight,
        fontFamily: fontMap[font],
        fontSize: `${fontSizeScale[fontSize]}em`,
        lineHeight: 1.4,
        color: '#1a1a1a',
        WebkitFontSmoothing: 'antialiased',
        textRendering: 'optimizeSpeed',
      }}
    >
      <TemplateRenderer resume={resume} />
    </div>
  )
})

ResumePreview.displayName = 'ResumePreview'

import type { Resume, Section, Entry } from '../../types/resume'

function parseBoldText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  const boldRegex = /\*\*(.+?)\*\*|\*([^*\n]+?)\*/g
  let match: RegExpExecArray | null

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const boldContent = match[1] || match[2]
    parts.push(<strong key={match.index}>{boldContent}</strong>)
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

function ContactHeader({ resume }: { resume: Resume }) {
  const { contact, settings } = resume
  const accent = settings.accentColor

  const contactItems: { text: string; href?: string }[] = [
    contact.email ? { text: contact.email, href: `mailto:${contact.email}` } : null,
    contact.phone ? { text: contact.phone } : null,
    contact.location ? { text: contact.location } : null,
    contact.linkedin ? { text: contact.linkedin, href: !/^https?:\/\//.test(contact.linkedin) ? `https://${contact.linkedin}` : contact.linkedin } : null,
    contact.website ? { text: contact.website, href: !/^https?:\/\//.test(contact.website) ? `https://${contact.website}` : contact.website } : null,
  ].filter((item): item is { text: string; href?: string } => item !== null)

  return (
    <div
      style={{
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: `2px solid ${accent}`,
      }}
    >
      <h1
        style={{
          fontSize: '1.8em',
          fontWeight: 700,
          color: '#1a1a1a',
          margin: '0 0 8px 0',
        }}
      >
        {contact.fullName || 'Tu Nombre'}
      </h1>
      <div
        style={{
          fontSize: '0.8em',
          color: '#555',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px 16px',
        }}
      >
        {contactItems.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: accent, fontWeight: 600 }}>|</span>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: accent, textDecoration: 'underline' }}>
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionTitle({ title, accent }: { title: string; accent: string }) {
  return (
    <h2
      style={{
        fontSize: '0.95em',
        fontWeight: 700,
        color: '#1a1a1a',
        margin: '0 0 8px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span
        style={{
          width: '3px',
          height: '16px',
          backgroundColor: accent,
          borderRadius: '2px',
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {title.toUpperCase()}
    </h2>
  )
}

function ExperienceEntry({ entry, accent }: { entry: Entry; accent: string }) {
  const dateRange = entry.startDate
    ? `${entry.startDate} – ${entry.current ? 'Presente' : entry.endDate}`
    : ''

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <strong style={{ fontSize: '0.9em', color: accent }}>{entry.title}</strong>
          {entry.organization && (
            <span style={{ fontSize: '0.85em', color: '#444' }}> — {entry.organization}</span>
          )}
        </div>
        <div style={{ fontSize: '0.8em', color: '#666', whiteSpace: 'nowrap', marginLeft: '12px' }}>
          {dateRange}
        </div>
      </div>
      {entry.location && (
        <div style={{ fontSize: '0.78em', color: '#888', marginTop: '1px' }}>{entry.location}</div>
      )}
      {entry.description && (
        <div style={{ fontSize: '0.85em', marginTop: '4px', whiteSpace: 'pre-line', color: '#333' }}>
          {parseBoldText(entry.description)}
        </div>
      )}
    </div>
  )
}

function ProjectEntry({ entry, accent }: { entry: Entry; accent: string }) {
  const rawUrl = entry.url || ''
  const displayUrl = rawUrl.replace(/^https?:\/\//, '')
  const href = rawUrl && !/^https?:\/\//.test(rawUrl) ? `https://${rawUrl}` : rawUrl

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <strong style={{ fontSize: '0.9em', color: accent }}>{entry.title}</strong>
        {displayUrl && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.8em', color: accent, textDecoration: 'underline', opacity: 0.8 }}
          >
            {displayUrl}
          </a>
        )}
      </div>
      {entry.description && (
        <div style={{ fontSize: '0.85em', marginTop: '4px', whiteSpace: 'pre-line', color: '#333' }}>
          {entry.description}
        </div>
      )}
      {entry.skills && entry.skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
          {entry.skills.map((skill) => (
            <span
              key={skill}
              style={{
                padding: '1px 9px',
                backgroundColor: `${accent}10`,
                border: `1px solid ${accent}30`,
                borderRadius: '999px',
                fontSize: '0.78em',
                color: '#333',
              }}
            >
              {parseBoldText(skill)}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function SkillsContent({ entry, accent }: { entry: Entry; accent: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '0.85em' }}>
      {entry.skills.map((skill) => (
        <span
          key={skill}
          style={{
            padding: '2px 10px',
            backgroundColor: `${accent}10`,
            border: `1px solid ${accent}30`,
            borderRadius: '999px',
            color: '#333',
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  )
}

function SectionRenderer({ section, accent }: { section: Section; accent: string }) {
  if (!section.visible) return null

  return (
    <div style={{ marginBottom: '18px' }}>
      <SectionTitle title={section.title} accent={accent} />
      {section.type === 'summary' ? (
        <div style={{ fontSize: '0.85em', color: '#333', whiteSpace: 'pre-line' }}>
          {section.entries[0]?.description}
        </div>
      ) : section.type === 'skills' || section.type === 'languages' ? (
        section.entries[0] && <SkillsContent entry={section.entries[0]} accent={accent} />
      ) : section.type === 'projects' ? (
        section.entries.map((entry) => (
          <ProjectEntry key={entry.id} entry={entry} accent={accent} />
        ))
      ) : section.type === 'references' ? (
        section.entries.map((entry) => (
          <div key={entry.id} style={{ marginBottom: '12px', fontSize: '0.85em' }}>
            {entry.title && <div style={{ fontWeight: 600, color: accent }}>{entry.title}</div>}
            {entry.organization && <div style={{ color: '#555' }}>{entry.organization}</div>}
            {entry.startDate && <div style={{ color: '#555' }}><strong>Phone:</strong> {entry.startDate}</div>}
            {entry.endDate && <div style={{ color: '#555' }}><strong>Email:</strong> {entry.endDate}</div>}
          </div>
        ))
      ) : (
        section.entries.map((entry) => (
          <ExperienceEntry key={entry.id} entry={entry} accent={accent} />
        ))
      )}
    </div>
  )
}

export function ModernTemplate({ resume }: { resume: Resume }) {
  const accent = resume.settings.accentColor

  return (
    <div style={{ padding: '40px 48px' }}>
      <ContactHeader resume={resume} />
      {resume.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} accent={accent} />
      ))}
    </div>
  )
}

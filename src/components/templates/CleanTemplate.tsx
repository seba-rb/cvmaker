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
  const { contact } = resume

  const contactItems: { text: string; href?: string }[] = [
    contact.email ? { text: contact.email, href: `mailto:${contact.email}` } : null,
    contact.phone ? { text: contact.phone } : null,
    contact.location ? { text: contact.location } : null,
    contact.linkedin ? { text: contact.linkedin, href: !/^https?:\/\//.test(contact.linkedin) ? `https://${contact.linkedin}` : contact.linkedin } : null,
    contact.website ? { text: contact.website, href: !/^https?:\/\//.test(contact.website) ? `https://${contact.website}` : contact.website } : null,
  ].filter((item): item is { text: string; href?: string } => item !== null)

  return (
    <div style={{ marginBottom: '24px' }}>
      <h1
        style={{
          fontSize: '1.5em',
          fontWeight: 400,
          color: '#1a1a1a',
          margin: '0 0 6px 0',
          letterSpacing: '0.02em',
        }}
      >
        {contact.fullName || 'Tu Nombre'}
      </h1>
      <div
        style={{
          fontSize: '0.8em',
          color: '#666',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px 10px',
        }}
      >
        {contactItems.map((item, i) => (
          <span key={i}>
            {i > 0 && <span style={{ marginRight: '10px', color: '#ccc' }}>·</span>}
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: '#4a7cbe', textDecoration: 'underline' }}>
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

function SectionTitle({ title }: { title: string }) {
  return (
    <h2
      style={{
        fontSize: '0.85em',
        fontWeight: 600,
        textTransform: 'uppercase',
        color: '#999',
        letterSpacing: '0.08em',
        margin: '0 0 8px 0',
      }}
    >
      {title}
    </h2>
  )
}

function ExperienceEntry({ entry }: { entry: Entry }) {
  const dateRange = entry.startDate
    ? `${entry.startDate} – ${entry.current ? 'Presente' : entry.endDate}`
    : ''

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <span style={{ fontSize: '0.9em', fontWeight: 600 }}>{entry.title}</span>
          {entry.organization && (
            <span style={{ fontSize: '0.85em', color: '#555' }}>, {entry.organization}</span>
          )}
          {entry.location && (
            <span style={{ fontSize: '0.8em', color: '#888' }}> — {entry.location}</span>
          )}
        </div>
        <div style={{ fontSize: '0.8em', color: '#888', whiteSpace: 'nowrap', marginLeft: '12px' }}>
          {dateRange}
        </div>
      </div>
      {entry.description && (
        <div style={{ fontSize: '0.85em', marginTop: '3px', whiteSpace: 'pre-line', color: '#444' }}>
          {parseBoldText(entry.description)}
        </div>
      )}
    </div>
  )
}

function ProjectEntry({ entry }: { entry: Entry }) {
  const rawUrl = entry.url || ''
  const displayUrl = rawUrl.replace(/^https?:\/\//, '')
  const href = rawUrl && !/^https?:\/\//.test(rawUrl) ? `https://${rawUrl}` : rawUrl

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '0.9em', fontWeight: 600 }}>{entry.title}</span>
        {displayUrl && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.8em', color: '#4a7cbe', textDecoration: 'underline' }}
          >
            {displayUrl}
          </a>
        )}
      </div>
      {entry.description && (
        <div style={{ fontSize: '0.85em', marginTop: '3px', whiteSpace: 'pre-line', color: '#444' }}>
          {entry.description}
        </div>
      )}
      {entry.skills && entry.skills.length > 0 && (
        <div style={{ fontSize: '0.82em', color: '#555', marginTop: '3px' }}>
          {entry.skills.map((skill, i) => (
            <span key={i}>
              {i > 0 && '  ·  '}
              {parseBoldText(skill)}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function SkillsContent({ entry }: { entry: Entry }) {
  return (
    <div style={{ fontSize: '0.85em', color: '#444' }}>
      {entry.skills.map((skill, i) => (
        <span key={i}>
          {i > 0 && '  ·  '}
          {parseBoldText(skill)}
        </span>
      ))}
    </div>
  )
}

function SectionRenderer({ section }: { section: Section }) {
  if (!section.visible) return null

  return (
    <div style={{ marginBottom: '16px' }}>
      <SectionTitle title={section.title} />
      {section.type === 'summary' ? (
        <div style={{ fontSize: '0.85em', color: '#444', whiteSpace: 'pre-line' }}>
          {section.entries[0]?.description}
        </div>
      ) : section.type === 'skills' || section.type === 'languages' ? (
        section.entries[0] && <SkillsContent entry={section.entries[0]} />
      ) : section.type === 'projects' ? (
        section.entries.map((entry) => <ProjectEntry key={entry.id} entry={entry} />)
      ) : section.type === 'references' ? (
        section.entries.map((entry) => (
          <div key={entry.id} style={{ marginBottom: '10px', fontSize: '0.85em' }}>
            {entry.title && <div style={{ fontWeight: 600, color: '#333' }}>{entry.title}</div>}
            {entry.organization && <div style={{ color: '#666' }}>{entry.organization}</div>}
            {entry.startDate && <div style={{ color: '#666' }}><span style={{ fontWeight: 500 }}>Phone:</span> {entry.startDate}</div>}
            {entry.endDate && <div style={{ color: '#666' }}><span style={{ fontWeight: 500 }}>Email:</span> {entry.endDate}</div>}
          </div>
        ))
      ) : (
        section.entries.map((entry) => <ExperienceEntry key={entry.id} entry={entry} />)
      )}
    </div>
  )
}

export function CleanTemplate({ resume }: { resume: Resume }) {
  return (
    <div style={{ padding: '48px 52px' }}>
      <ContactHeader resume={resume} />
      <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '16px' }}>
        {resume.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}

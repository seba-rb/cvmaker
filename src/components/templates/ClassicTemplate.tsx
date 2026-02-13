import type { Resume, Section, Entry } from '../../types/resume'

function ContactHeader({ resume }: { resume: Resume }) {
  const { contact, settings } = resume
  const accent = settings.accentColor

  const contactItems = [
    contact.email,
    contact.phone,
    contact.location,
    contact.linkedin,
    contact.website,
  ].filter(Boolean)

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h1
        style={{
          fontSize: '1.6em',
          fontWeight: 700,
          color: accent,
          margin: '0 0 6px 0',
          letterSpacing: '-0.01em',
        }}
      >
        {contact.fullName || 'Tu Nombre'}
      </h1>
      <div
        style={{
          fontSize: '0.8em',
          color: '#555',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '4px 12px',
        }}
      >
        {contactItems.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}

function SectionTitle({ title, accent }: { title: string; accent: string }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <h2
        style={{
          fontSize: '0.95em',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: accent,
          letterSpacing: '0.05em',
          margin: 0,
          paddingBottom: '4px',
          borderBottom: `1.5px solid ${accent}`,
        }}
      >
        {title}
      </h2>
    </div>
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
          <strong style={{ fontSize: '0.9em' }}>{entry.title}</strong>
          {entry.organization && (
            <span style={{ fontSize: '0.85em', color: '#444' }}> | {entry.organization}</span>
          )}
        </div>
        <div style={{ fontSize: '0.8em', color: '#666', whiteSpace: 'nowrap', marginLeft: '12px' }}>
          {dateRange}
        </div>
      </div>
      {entry.location && (
        <div style={{ fontSize: '0.8em', color: '#666' }}>{entry.location}</div>
      )}
      {entry.description && (
        <div style={{ fontSize: '0.85em', marginTop: '4px', whiteSpace: 'pre-line', color: '#333' }}>
          {entry.description}
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
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <strong style={{ fontSize: '0.9em' }}>{entry.title}</strong>
        {displayUrl && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.8em', color: accent, textDecoration: 'underline' }}
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
          {entry.skills.map((skill) => (
            <span
              key={skill}
              style={{
                padding: '1px 7px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                fontSize: '0.78em',
                color: '#374151',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function SkillsContent({ entry }: { entry: Entry }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '0.85em' }}>
      {entry.skills.map((skill) => (
        <span
          key={skill}
          style={{
            padding: '2px 8px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            color: '#374151',
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
    <div style={{ marginBottom: '16px' }}>
      <SectionTitle title={section.title} accent={accent} />
      {section.type === 'summary' ? (
        <div style={{ fontSize: '0.85em', color: '#333', whiteSpace: 'pre-line' }}>
          {section.entries[0]?.description}
        </div>
      ) : section.type === 'skills' || section.type === 'languages' ? (
        section.entries[0] && <SkillsContent entry={section.entries[0]} />
      ) : section.type === 'projects' ? (
        section.entries.map((entry) => (
          <ProjectEntry key={entry.id} entry={entry} accent={accent} />
        ))
      ) : section.type === 'references' ? (
        section.entries.map((entry) => (
          <div key={entry.id} style={{ marginBottom: '10px', fontSize: '0.85em' }}>
            {entry.title && <div style={{ fontWeight: 600 }}>{entry.title}</div>}
            {entry.organization && <div style={{ color: '#555' }}>{entry.organization}</div>}
            {entry.startDate && <div style={{ color: '#555' }}><strong>Phone:</strong> {entry.startDate}</div>}
            {entry.endDate && <div style={{ color: '#555' }}><strong>Email:</strong> {entry.endDate}</div>}
          </div>
        ))
      ) : (
        section.entries.map((entry) => <ExperienceEntry key={entry.id} entry={entry} />)
      )}
    </div>
  )
}

export function ClassicTemplate({ resume }: { resume: Resume }) {
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

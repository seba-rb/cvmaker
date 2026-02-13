import type { Resume, Section, Entry } from '../../types/resume'

/*
 * Executive Template — Typography system
 *
 * Headings:  weight 600–700, uppercase, wide letter-spacing (0.18–0.22em)
 * Sub-heads: weight 600, normal case or uppercase, moderate spacing (0.04–0.08em)
 * Body:      weight 400 (light/regular), tight spacing (0–0.01em), high line-height
 * Captions:  weight 300–400, small size, muted color
 *
 * When paired with Montserrat these weights create the contrast visible in the
 * reference design.  The system also looks good with Inter or any other
 * geometric sans-serif the user picks.
 */

// ── Shared heading ──────────────────────────────────────────────────────────

function SectionHeading({ title }: { title: string }) {
  return (
    <h2
      style={{
        fontSize: '0.78em',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.22em',
        color: '#3d3d3d',
        margin: '0 0 10px 0',
        paddingBottom: '8px',
        borderBottom: '1px solid #d4d4d4',
      }}
    >
      {title}
    </h2>
  )
}

function parseBullets(text: string) {
  const lines = text.split('\n').filter((l) => l.trim())
  return lines.map((line) => line.replace(/^[•\-\*]\s*/, ''))
}

// ── LEFT COLUMN ─────────────────────────────────────────────────────────────

function HeaderLeft({ resume }: { resume: Resume }) {
  const { contact } = resume
  const experienceSection = resume.sections.find((s) => s.type === 'experience')
  const latestTitle = experienceSection?.entries[0]?.title || ''

  return (
    <div style={{ marginBottom: '28px' }}>
      <h1
        style={{
          fontSize: '2.4em',
          fontWeight: 700,
          lineHeight: 1.08,
          color: '#2d2d2d',
          margin: '0 0 8px 0',
          letterSpacing: '0.01em',
        }}
      >
        {(contact.fullName || 'TU NOMBRE').toUpperCase()}
      </h1>
      {latestTitle && (
        <div
          style={{
            fontSize: '0.78em',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: '#777',
            marginTop: '4px',
          }}
        >
          {latestTitle}
        </div>
      )}
    </div>
  )
}

function ExperienceEntry({ entry, accent }: { entry: Entry; accent: string }) {
  const dateRange = entry.startDate
    ? `${entry.startDate} - ${entry.current ? 'PRESENTE' : entry.endDate}`
    : ''
  const orgLine = [entry.organization, entry.location].filter(Boolean).join(' | ')
  const bullets = entry.description ? parseBullets(entry.description) : []

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            backgroundColor: accent,
            borderRadius: '1px',
            marginTop: '4px',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          {/* Date — semi-bold, wide tracking */}
          <div
            style={{
              fontSize: '0.8em',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: '#3d3d3d',
            }}
          >
            {dateRange.toUpperCase()}
          </div>

          {/* Organization — light weight caption */}
          {orgLine && (
            <div
              style={{
                fontSize: '0.76em',
                fontWeight: 400,
                letterSpacing: '0.01em',
                color: '#666',
                marginTop: '1px',
              }}
            >
              {orgLine}
            </div>
          )}

          {/* Job title — semi-bold, normal tracking */}
          {entry.title && (
            <div
              style={{
                fontSize: '0.84em',
                fontWeight: 600,
                letterSpacing: '0.01em',
                color: '#2d2d2d',
                marginTop: '5px',
              }}
            >
              {entry.title}
            </div>
          )}

          {/* Bullets — regular weight, relaxed line height */}
          {bullets.length > 0 && (
            <ul
              style={{
                margin: '6px 0 0 0',
                paddingLeft: '16px',
                listStyleType: 'disc',
                fontSize: '0.78em',
                fontWeight: 400,
                letterSpacing: '0.005em',
                color: '#444',
                lineHeight: 1.6,
              }}
            >
              {bullets.map((b, i) => (
                <li key={i} style={{ marginBottom: '3px' }}>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectEntry({ entry, accent }: { entry: Entry; accent: string }) {
  const rawUrl = entry.url || ''
  const displayUrl = rawUrl.replace(/^https?:\/\//, '')
  const href = rawUrl && !/^https?:\/\//.test(rawUrl) ? `https://${rawUrl}` : rawUrl
  const bullets = entry.description ? parseBullets(entry.description) : []

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            backgroundColor: accent,
            borderRadius: '1px',
            marginTop: '4px',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          {entry.title && (
            <div
              style={{
                fontSize: '0.84em',
                fontWeight: 600,
                letterSpacing: '0.01em',
                color: '#2d2d2d',
              }}
            >
              {entry.title}
            </div>
          )}
          {displayUrl && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.76em',
                fontWeight: 400,
                letterSpacing: '0.01em',
                color: accent,
                textDecoration: 'underline',
                display: 'block',
                marginTop: '1px',
              }}
            >
              {displayUrl}
            </a>
          )}
          {bullets.length > 0 && (
            <ul
              style={{
                margin: '6px 0 0 0',
                paddingLeft: '16px',
                listStyleType: 'disc',
                fontSize: '0.78em',
                fontWeight: 400,
                letterSpacing: '0.005em',
                color: '#444',
                lineHeight: 1.6,
              }}
            >
              {bullets.map((b, i) => (
                <li key={i} style={{ marginBottom: '3px' }}>
                  {b}
                </li>
              ))}
            </ul>
          )}
          {entry.skills && entry.skills.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
              {entry.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: '1px 7px',
                    fontSize: '0.72em',
                    fontWeight: 400,
                    color: '#555',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '2px',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectsBlock({ section, accent }: { section: Section; accent: string }) {
  if (!section.visible) return null
  return (
    <div style={{ marginBottom: '24px' }}>
      <SectionHeading title={section.title} />
      {section.entries.map((entry) => (
        <ProjectEntry key={entry.id} entry={entry} accent={accent} />
      ))}
    </div>
  )
}

function SummaryBlock({ section }: { section: Section }) {
  if (!section.visible) return null
  const text = section.entries[0]?.description
  if (!text) return null

  return (
    <div style={{ marginBottom: '24px' }}>
      <SectionHeading title={section.title} />
      <div
        style={{
          fontSize: '0.8em',
          fontWeight: 400,
          letterSpacing: '0.005em',
          color: '#444',
          lineHeight: 1.65,
          textAlign: 'justify',
        }}
      >
        {text}
      </div>
    </div>
  )
}

function ExperienceBlock({ section, accent }: { section: Section; accent: string }) {
  if (!section.visible) return null
  return (
    <div style={{ marginBottom: '24px' }}>
      <SectionHeading title={section.title} />
      {section.entries.map((entry) => (
        <ExperienceEntry key={entry.id} entry={entry} accent={accent} />
      ))}
    </div>
  )
}

// ── RIGHT COLUMN ────────────────────────────────────────────────────────────

function ContactBlock({ resume }: { resume: Resume }) {
  const { contact } = resume

  const accent = resume.settings.accentColor

  const items: { label: string; value: string; href?: string }[] = [
    { label: 'tel', value: contact.phone },
    { label: 'email', value: contact.email, href: contact.email ? `mailto:${contact.email}` : undefined },
    { label: 'loc', value: contact.location },
    { label: 'linkedin', value: contact.linkedin, href: contact.linkedin ? (!/^https?:\/\//.test(contact.linkedin) ? `https://${contact.linkedin}` : contact.linkedin) : undefined },
    { label: 'web', value: contact.website, href: contact.website ? (!/^https?:\/\//.test(contact.website) ? `https://${contact.website}` : contact.website) : undefined },
  ].filter((i) => i.value)

  const icons: Record<string, string> = {
    tel: '\u260E',
    email: '\u2709',
    loc: '\u25CB',
    linkedin: '\u0069\u006E',
    web: '\u25CE',
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.76em',
            fontWeight: 400,
            letterSpacing: '0.01em',
            color: '#444',
            marginBottom: '8px',
          }}
        >
          <span style={{ fontSize: '1em', color: '#888', width: '14px', textAlign: 'center' }}>
            {icons[item.label]}
          </span>
          {item.href ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: accent, textDecoration: 'underline' }}>
              {item.value}
            </a>
          ) : (
            item.value
          )}
        </div>
      ))}
    </div>
  )
}

function EducationBlock({ section }: { section: Section }) {
  if (!section.visible) return null
  return (
    <div style={{ marginBottom: '24px' }}>
      <SectionHeading title={section.title} />
      {section.entries.map((entry) => {
        const dateRange = entry.startDate
          ? `${entry.startDate} - ${entry.current ? 'Presente' : entry.endDate}`
          : ''
        const bullets = entry.description ? parseBullets(entry.description) : []

        return (
          <div key={entry.id} style={{ marginBottom: '12px' }}>
            {dateRange && (
              <div
                style={{
                  fontSize: '0.78em',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: '#3d3d3d',
                }}
              >
                {dateRange}
              </div>
            )}
            {entry.organization && (
              <div
                style={{
                  fontSize: '0.76em',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#555',
                  marginTop: '1px',
                }}
              >
                {entry.organization}
              </div>
            )}
            {(entry.title || bullets.length > 0) && (
              <ul
                style={{
                  margin: '4px 0 0 0',
                  paddingLeft: '16px',
                  listStyleType: 'disc',
                  fontSize: '0.76em',
                  fontWeight: 400,
                  letterSpacing: '0.005em',
                  color: '#444',
                  lineHeight: 1.55,
                }}
              >
                {entry.title && <li>{entry.title}</li>}
                {bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}

function SkillsBlock({ section }: { section: Section }) {
  if (!section.visible) return null
  const skills = section.entries[0]?.skills || []
  if (skills.length === 0) return null

  return (
    <div style={{ marginBottom: '24px' }}>
      <SectionHeading title={section.title} />
      <ul
        style={{
          margin: 0,
          paddingLeft: '16px',
          listStyleType: 'disc',
          fontSize: '0.76em',
          fontWeight: 400,
          letterSpacing: '0.005em',
          color: '#444',
          lineHeight: 1.75,
        }}
      >
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

function ReferencesBlock({ section }: { section: Section }) {
  if (!section.visible) return null
  if (section.entries.length === 0) return null

  return (
    <div style={{ marginBottom: '24px' }}>
      <SectionHeading title={section.title} />
      {section.entries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: '12px' }}>
          {entry.title && (
            <div
              style={{
                fontSize: '0.8em',
                fontWeight: 600,
                letterSpacing: '0.01em',
                color: '#3d3d3d',
              }}
            >
              {entry.title}
            </div>
          )}
          {entry.organization && (
            <div
              style={{
                fontSize: '0.76em',
                fontWeight: 400,
                letterSpacing: '0.005em',
                color: '#555',
                marginTop: '1px',
              }}
            >
              {entry.organization}
            </div>
          )}
          {entry.startDate && (
            <div
              style={{
                fontSize: '0.76em',
                fontWeight: 400,
                letterSpacing: '0.005em',
                color: '#444',
                marginTop: '2px',
              }}
            >
              <span style={{ fontWeight: 600 }}>Phone:</span> {entry.startDate}
            </div>
          )}
          {entry.endDate && (
            <div
              style={{
                fontSize: '0.76em',
                fontWeight: 400,
                letterSpacing: '0.005em',
                color: '#444',
                marginTop: '1px',
              }}
            >
              <span style={{ fontWeight: 600 }}>Email:</span> {entry.endDate}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── MAIN TEMPLATE ───────────────────────────────────────────────────────────

const defaultColumn: Record<string, 'left' | 'right'> = {
  summary: 'left',
  experience: 'left',
  projects: 'left',
  certifications: 'left',
  custom: 'left',
  education: 'right',
  skills: 'right',
  languages: 'right',
  references: 'right',
}

function getColumn(section: Section): 'left' | 'right' {
  return section.column || defaultColumn[section.type] || 'left'
}

export function ExecutiveTemplate({ resume }: { resume: Resume }) {
  const accent = resume.settings.accentColor
  const sections = resume.sections

  const leftSections = sections.filter((s) => getColumn(s) === 'left')
  const rightSections = sections.filter((s) => getColumn(s) === 'right')

  const renderSection = (section: Section) => {
    if (!section.visible) return null
    switch (section.type) {
      case 'summary':
        return <SummaryBlock key={section.id} section={section} />
      case 'experience':
      case 'certifications':
      case 'custom':
        return <ExperienceBlock key={section.id} section={section} accent={accent} />
      case 'projects':
        return <ProjectsBlock key={section.id} section={section} accent={accent} />
      case 'education':
        return <EducationBlock key={section.id} section={section} />
      case 'references':
        return <ReferencesBlock key={section.id} section={section} />
      case 'skills':
      case 'languages':
      default:
        return <SkillsBlock key={section.id} section={section} />
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100%' }}>
      {/* Left column */}
      <div style={{ flex: '0 0 58%', padding: '40px 32px 40px 44px' }}>
        <HeaderLeft resume={resume} />
        {leftSections.map(renderSection)}
      </div>

      {/* Divider */}
      <div
        style={{
          width: '1px',
          backgroundColor: '#d4d4d4',
          marginTop: '40px',
          marginBottom: '40px',
        }}
      />

      {/* Right column */}
      <div style={{ flex: 1, padding: '40px 44px 40px 28px' }}>
        <ContactBlock resume={resume} />
        {rightSections.map(renderSection)}
      </div>
    </div>
  )
}

const STORAGE_KEY = 'cvmaker-gemini-key'

export function getApiKey(): string {
  return localStorage.getItem(STORAGE_KEY) || ''
}

export function setApiKey(key: string) {
  localStorage.setItem(STORAGE_KEY, key)
}

export function hasApiKey(): boolean {
  return !!getApiKey()
}

async function callGemini(prompt: string): Promise<string> {
  const apiKey = getApiKey()
  if (!apiKey) throw new Error('No API key configured')

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error?.error?.message || `Gemini API error: ${response.status}`)
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

export async function improveBulletPoints(text: string, jobTitle: string): Promise<string> {
  const prompt = `Eres un experto en redacción de CVs profesionales. Mejora las siguientes viñetas/descripción de experiencia laboral para el puesto de "${jobTitle}".

Reglas:
- Usa verbos de acción al inicio (Lideré, Desarrollé, Implementé, Optimicé, etc.)
- Incluye métricas y resultados cuantificables cuando sea posible
- Mantén cada viñeta concisa (1-2 líneas)
- Usa el formato con viñetas (• al inicio de cada punto)
- Responde SOLO con el texto mejorado, sin explicaciones ni comentarios adicionales
- Mantén el idioma original del texto

Texto original:
${text}`

  return callGemini(prompt)
}

export async function generateSummary(
  jobTitle: string,
  experience: string,
  skills: string[]
): Promise<string> {
  const prompt = `Eres un experto en redacción de CVs profesionales. Genera un resumen profesional de 2-3 oraciones para un CV.

Datos:
- Experiencia: ${experience}
- Puesto actual/deseado: ${jobTitle}
- Habilidades: ${skills.join(', ')}

Reglas:
- 2-3 oraciones máximo
- Tono profesional pero no genérico
- Menciona años de experiencia, especialización y valor que aporta
- Responde SOLO con el resumen, sin explicaciones
- Usa el idioma español`

  return callGemini(prompt)
}

export async function suggestSkills(
  jobTitle: string,
  currentSkills: string[]
): Promise<string[]> {
  const prompt = `Eres un experto en reclutamiento. Sugiere 8-10 habilidades relevantes para el puesto de "${jobTitle}" que complementen las habilidades existentes.

Habilidades actuales: ${currentSkills.join(', ')}

Reglas:
- Sugiere habilidades que NO estén ya en la lista
- Incluye tanto habilidades técnicas como blandas
- Responde SOLO con una lista separada por comas, sin explicaciones ni numeración
- Ejemplo: React, TypeScript, Gestión de equipos, Comunicación efectiva`

  const result = await callGemini(prompt)
  return result
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

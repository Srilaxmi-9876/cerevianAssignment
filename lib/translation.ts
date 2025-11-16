// Translation service using OpenAI API or fallback to simple translation
// For production, you can use OpenAI, Google Translate API, or other services

export async function translateText(
  text: string,
  targetLanguage: string
): Promise<string> {
  // If target language is English, return as is
  if (targetLanguage === 'en') {
    return text
  }

  // Check if OpenAI API key is available
  const openaiApiKey = process.env.OPENAI_API_KEY

  if (openaiApiKey) {
    try {
      return await translateWithOpenAI(text, targetLanguage, openaiApiKey)
    } catch (error) {
      console.error('OpenAI translation failed, using fallback:', error)
      // Fall through to fallback
    }
  }

  // Fallback: Use a simple translation service or return placeholder
  // In production, you might want to use Google Translate API or another service
  return await translateWithFallback(text, targetLanguage)
}

async function translateWithOpenAI(
  text: string,
  targetLanguage: string,
  apiKey: string
): Promise<string> {
  const { default: OpenAI } = await import('openai')
  const openai = new OpenAI({ apiKey })

  const languageNames: Record<string, string> = {
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pt: 'Portuguese',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
    hi: 'Hindi',
    ar: 'Arabic',
    ru: 'Russian',
  }

  const targetLangName = languageNames[targetLanguage] || targetLanguage

  // Split text into chunks to handle long texts
  const chunks = splitTextIntoChunks(text, 3000)
  const translatedChunks: string[] = []

  for (const chunk of chunks) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate the following text to ${targetLangName}. Preserve the paragraph structure and formatting. Only return the translated text, no explanations.`,
        },
        {
          role: 'user',
          content: chunk,
        },
      ],
      temperature: 0.3,
    })

    const translated = response.choices[0]?.message?.content || chunk
    translatedChunks.push(translated)
  }

  return translatedChunks.join('\n\n')
}

async function translateWithFallback(
  text: string,
  targetLanguage: string
): Promise<string> {
  // Fallback translation using a free API or simple mapping
  // For demo purposes, we'll use a placeholder
  // In production, integrate with Google Translate API or similar

  try {
    // Try using LibreTranslate or similar free service
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text.substring(0, 5000), // Limit text length
        source: 'auto',
        target: targetLanguage,
        format: 'text',
      }),
      // Timeout handled by fetch implementation
    })

    if (response.ok) {
      const data = await response.json()
      if (data.translatedText) {
        return data.translatedText
      }
    } else {
      console.error('LibreTranslate API error:', response.status, response.statusText)
    }
  } catch (error: any) {
    console.error('Fallback translation failed:', error.message)
  }

  // Ultimate fallback: return text as-is (for demo purposes)
  // In production, you should configure OPENAI_API_KEY or use Google Translate API
  console.warn(`Translation not available. Returning original text. Configure OPENAI_API_KEY for translation.`)
  return text
}

function splitTextIntoChunks(text: string, maxLength: number): string[] {
  const chunks: string[] = []
  const paragraphs = text.split(/\n\s*\n/)

  let currentChunk = ''
  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length + 2 <= maxLength) {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph
    } else {
      if (currentChunk) {
        chunks.push(currentChunk)
      }
      currentChunk = paragraph
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk)
  }

  return chunks.length > 0 ? chunks : [text]
}


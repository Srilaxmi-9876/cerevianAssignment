// Text-to-Speech service using Google TTS API directly (secure implementation)
import axios from 'axios'

export async function textToSpeech(
  text: string,
  languageCode: string
): Promise<Buffer> {
  // Map language codes to Google TTS language codes
  const langMap: Record<string, string> = {
    en: 'en',
    es: 'es',
    fr: 'fr',
    de: 'de',
    it: 'it',
    pt: 'pt',
    zh: 'zh',
    ja: 'ja',
    ko: 'ko',
    hi: 'hi',
    ar: 'ar',
    ru: 'ru',
  }

  const ttsLang = langMap[languageCode] || 'en'

  // Split text into chunks if too long (Google TTS has limits ~200 chars per request)
  const textChunks = splitTextForTTS(text, 200)
  
  if (textChunks.length === 1) {
    return fetchGoogleTTS(textChunks[0], ttsLang)
  } else {
    // Multiple chunks - combine them
    return combineAudioChunks(textChunks, ttsLang)
  }
}

async function fetchGoogleTTS(text: string, languageCode: string): Promise<Buffer> {
  try {
    // Clean and limit text
    const cleanText = text.trim().substring(0, 200)
    if (!cleanText) {
      throw new Error('Empty text provided for TTS')
    }
    
    // Google TTS API endpoint (free, no API key required)
    const url = `https://translate.google.com/translate_tts`
    
    const response = await axios.get(url, {
      params: {
        ie: 'UTF-8',
        q: cleanText,
        tl: languageCode,
        client: 'gtx',
        total: '1',
        idx: '0',
        textlen: cleanText.length.toString(),
      },
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
        'Accept': '*/*',
      },
      timeout: 30000,
      maxRedirects: 5,
    })

    if (!response.data || response.data.length === 0) {
      throw new Error('Empty response from TTS service')
    }

    // Verify it's actually audio data (MP3 files start with specific bytes)
    const buffer = Buffer.from(response.data)
    if (buffer.length < 100) {
      throw new Error('Response too short to be valid audio')
    }

    return buffer
  } catch (error: any) {
    const status = error.response?.status
    const statusText = error.response?.statusText
    const errorMsg = error.message
    
    console.error('Google TTS Error Details:')
    console.error('  Status:', status)
    console.error('  Status Text:', statusText)
    console.error('  Message:', errorMsg)
    console.error('  Language:', languageCode)
    console.error('  Text length:', text.length)
    
    // Provide more helpful error message
    if (status === 403 || status === 429) {
      throw new Error(`TTS service rate limited. Please wait a moment and try again.`)
    } else if (status === 404) {
      throw new Error(`TTS service endpoint not found. Language '${languageCode}' may not be supported.`)
    } else {
      throw new Error(`TTS generation failed (${status || 'network error'}). Error: ${errorMsg}`)
    }
  }
}

function splitTextForTTS(text: string, maxLength: number): string[] {
  // Split by sentences first
  const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0)
  const chunks: string[] = []
  let currentChunk = ''

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim()
    
    // If single sentence is too long, split it by words
    if (trimmedSentence.length > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk.trim())
        currentChunk = ''
      }
      
      // Split long sentence by words
      const words = trimmedSentence.split(/\s+/)
      let wordChunk = ''
      
      for (const word of words) {
        if ((wordChunk + ' ' + word).length <= maxLength) {
          wordChunk += (wordChunk ? ' ' : '') + word
        } else {
          if (wordChunk) {
            chunks.push(wordChunk)
          }
          wordChunk = word
        }
      }
      
      if (wordChunk) {
        currentChunk = wordChunk
      }
    } else if (currentChunk.length + trimmedSentence.length + 1 <= maxLength) {
      currentChunk += (currentChunk ? ' ' : '') + trimmedSentence
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim())
      }
      currentChunk = trimmedSentence
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }

  return chunks.length > 0 ? chunks : [text.substring(0, maxLength)]
}

async function combineAudioChunks(
  textChunks: string[],
  languageCode: string
): Promise<Buffer> {
  const audioChunks: Buffer[] = []

  for (let i = 0; i < textChunks.length; i++) {
    const chunk = textChunks[i].trim()
    if (!chunk) continue
    
    try {
      const audioBuffer = await fetchGoogleTTS(chunk, languageCode)
      audioChunks.push(audioBuffer)
      
      // Delay between chunks to avoid rate limiting (except for last chunk)
      if (i < textChunks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (error: any) {
      console.error(`Failed to generate TTS for chunk ${i + 1}/${textChunks.length}:`, error.message)
      // Continue with other chunks even if one fails
    }
  }

  if (audioChunks.length === 0) {
    throw new Error('Failed to generate any audio chunks')
  }

  return Buffer.concat(audioChunks)
}


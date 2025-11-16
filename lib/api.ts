import axios from 'axios'

export interface TranslationResult {
  translatedText: string
  audioUrl: string
}

export async function translateAndConvertToSpeech(
  file: File,
  text: string,
  targetLanguage: string
): Promise<TranslationResult> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('text', text)
  formData.append('targetLanguage', targetLanguage)

  const response = await axios.post<TranslationResult>(
    '/api/translate-and-tts',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 2 minutes timeout
    }
  )

  return response.data
}

export async function extractTextFromPDF(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await axios.post<{ text: string }>(
    '/api/extract-text',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return response.data.text
}


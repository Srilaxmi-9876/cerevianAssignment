import { NextRequest, NextResponse } from 'next/server'
import { translateText } from '@/lib/translation'
import { textToSpeech } from '@/lib/tts'
import path from 'path'
import fs from 'fs-extra'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const text = formData.get('text') as string
    const targetLanguage = formData.get('targetLanguage') as string

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      )
    }

    console.log('Starting translation and TTS generation...')
    console.log('Text length:', text.length)
    console.log('Target language:', targetLanguage)

    // Translate text
    const translatedText = await translateText(text, targetLanguage)
    console.log('Translation completed. Length:', translatedText.length)

    // Convert to speech
    const audioBuffer = await textToSpeech(translatedText, targetLanguage)
    console.log('TTS generation completed. Audio buffer size:', audioBuffer.length)

    if (!audioBuffer || audioBuffer.length === 0) {
      throw new Error('Generated audio buffer is empty')
    }

    // Try to save to file system (for local development)
    // On Render, this might fail, so we'll also return base64
    let audioUrl: string | null = null
    
    try {
      const audioDir = path.join(process.cwd(), 'public', 'audio')
      await fs.ensureDir(audioDir)
      
      const audioFileName = `audio-${Date.now()}-${Math.random().toString(36).substring(7)}.mp3`
      const audioPath = path.join(audioDir, audioFileName)
      
      await fs.writeFile(audioPath, audioBuffer)
      audioUrl = `/audio/${audioFileName}`
      console.log('Audio file saved to:', audioPath)
    } catch (fsError: any) {
      console.warn('Failed to save audio to file system (this is OK on Render):', fsError.message)
      // Continue with base64 approach
    }

    // Convert audio buffer to base64 data URL (works on all platforms)
    const base64Audio = audioBuffer.toString('base64')
    const audioDataUrl = `data:audio/mpeg;base64,${base64Audio}`

    // Return translated text and audio (prefer file URL, fallback to data URL)
    return NextResponse.json({
      translatedText,
      audioUrl: audioUrl || audioDataUrl,
      audioDataUrl, // Always include data URL as backup
    })
  } catch (error: any) {
    console.error('Error in translate-and-tts:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to translate and generate audio',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}


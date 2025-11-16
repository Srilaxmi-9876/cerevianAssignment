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

    // Translate text
    const translatedText = await translateText(text, targetLanguage)

    // Convert to speech
    const audioBuffer = await textToSpeech(translatedText, targetLanguage)

    // Save audio file
    const audioDir = path.join(process.cwd(), 'public', 'audio')
    await fs.ensureDir(audioDir)
    
    const audioFileName = `audio-${Date.now()}-${Math.random().toString(36).substring(7)}.mp3`
    const audioPath = path.join(audioDir, audioFileName)
    
    await fs.writeFile(audioPath, audioBuffer)

    // Return translated text and audio URL
    const audioUrl = `/audio/${audioFileName}`

    return NextResponse.json({
      translatedText,
      audioUrl,
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


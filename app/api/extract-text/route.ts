import { NextRequest, NextResponse } from 'next/server'
import pdf from 'pdf-parse'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      )
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Extract text from PDF
    const data = await pdf(buffer)
    
    // Clean up the text and preserve paragraph structure
    let text = data.text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    return NextResponse.json({ text })
  } catch (error: any) {
    console.error('Error extracting text from PDF:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to extract text from PDF' },
      { status: 500 }
    )
  }
}


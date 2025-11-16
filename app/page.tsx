'use client'

import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import LanguageSelector from '@/components/LanguageSelector'
import AudioPlayer from '@/components/AudioPlayer'
import TextPreview from '@/components/TextPreview'
import { translateAndConvertToSpeech } from '@/lib/api'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState<string>('')
  const [translatedText, setTranslatedText] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setExtractedText('')
    setTranslatedText('')
    setAudioUrl('')
    setError('')
  }

  const handleTranslate = async () => {
    if (!file || !extractedText) {
      setError('Please upload a file and extract text first')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      const result = await translateAndConvertToSpeech(
        file,
        extractedText,
        selectedLanguage
      )
      
      setTranslatedText(result.translatedText)
      // Use data URL if available (for Render compatibility), otherwise use file URL
      setAudioUrl(result.audioDataUrl || result.audioUrl)
    } catch (err: any) {
      console.error('Translation/TTS error:', err)
      setError(err.message || 'Failed to translate and generate audio')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            🟦 Cerevyn
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Multilingual PDF/Textbook Voice Translator
          </p>
          <p className="text-gray-500">
            Upload your PDF, select a language, and listen to your content in natural voice
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload & Controls */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                1. Upload PDF
              </h2>
              <FileUpload
                onFileSelect={handleFileSelect}
                onTextExtracted={setExtractedText}
                selectedFile={file}
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                2. Select Language
              </h2>
              <LanguageSelector
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                disabled={!extractedText || isProcessing}
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <button
                onClick={handleTranslate}
                disabled={!extractedText || isProcessing || !selectedLanguage}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Translate & Generate Voice'
                )}
              </button>
            </div>

            {/* Audio Player */}
            {audioUrl && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  3. Listen & Download
                </h2>
                <AudioPlayer audioUrl={audioUrl} />
              </div>
            )}
          </div>

          {/* Right Column - Text Preview */}
          <div className="space-y-6">
            {extractedText && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Extracted Text
                </h2>
                <TextPreview text={extractedText} />
              </div>
            )}

            {translatedText && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Translated Text ({selectedLanguage.toUpperCase()})
                </h2>
                <TextPreview text={translatedText} />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by AI Translation & Text-to-Speech Technology</p>
        </div>
      </div>
    </main>
  )
}


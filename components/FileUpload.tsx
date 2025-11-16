'use client'

import { useState, useRef } from 'react'
import { extractTextFromPDF } from '@/lib/api'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onTextExtracted: (text: string) => void
  selectedFile: File | null
}

export default function FileUpload({
  onFileSelect,
  onTextExtracted,
  selectedFile,
}: FileUploadProps) {
  const [isExtracting, setIsExtracting] = useState(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setError('')
    onFileSelect(file)
    setIsExtracting(true)

    try {
      const text = await extractTextFromPDF(file)
      onTextExtracted(text)
    } catch (err: any) {
      setError(err.message || 'Failed to extract text from PDF')
    } finally {
      setIsExtracting(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      const fakeEvent = {
        target: { files: [file] },
      } as any
      handleFileChange(fakeEvent)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {isExtracting ? (
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Extracting text from PDF...</p>
          </div>
        ) : selectedFile ? (
          <div className="flex flex-col items-center">
            <svg className="h-12 w-12 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700 font-medium">{selectedFile.name}</p>
            <p className="text-sm text-gray-500 mt-2">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <p className="text-sm text-blue-600 mt-2">Click to upload a different file</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-700 font-medium mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">PDF files only (max 10MB)</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  )
}


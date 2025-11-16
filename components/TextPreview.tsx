'use client'

interface TextPreviewProps {
  text: string
}

export default function TextPreview({ text }: TextPreviewProps) {
  // Preserve paragraph structure by splitting on double newlines
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0)

  return (
    <div className="max-h-96 overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
      {paragraphs.length > 0 ? (
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-700 leading-relaxed whitespace-pre-wrap"
            >
              {paragraph.trim()}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap">{text}</p>
      )}
    </div>
  )
}


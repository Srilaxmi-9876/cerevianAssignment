'use client'

import { SUPPORTED_LANGUAGES } from '@/lib/languages'

interface LanguageSelectorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export default function LanguageSelector({
  value,
  onChange,
  disabled = false,
}: LanguageSelectorProps) {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 font-medium"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
      <p className="mt-2 text-sm text-gray-500">
        Select target language for translation and voice output
      </p>
    </div>
  )
}


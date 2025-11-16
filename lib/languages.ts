export interface Language {
  code: string
  name: string
  nativeName: string
  ttsCode: string
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', ttsCode: 'en' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', ttsCode: 'es' },
  { code: 'fr', name: 'French', nativeName: 'Français', ttsCode: 'fr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', ttsCode: 'de' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', ttsCode: 'it' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', ttsCode: 'pt' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', ttsCode: 'zh' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', ttsCode: 'ja' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', ttsCode: 'ko' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', ttsCode: 'hi' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', ttsCode: 'ar' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', ttsCode: 'ru' },
]

export function getLanguageByCode(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code)
}


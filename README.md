# 🟦 Cerevyn - Multilingual PDF/Textbook Voice Translator

An AI-powered web application that translates PDF documents and textbooks into natural-sounding voice output in multiple languages.

## 🌟 Features

- **PDF Upload**: Drag-and-drop or click to upload PDF files
- **Accurate Text Extraction**: Extracts text from PDFs while preserving paragraph structure
- **Multi-language Translation**: Supports 12+ languages including:
  - English, Spanish, French, German, Italian, Portuguese
  - Chinese, Japanese, Korean, Hindi, Arabic, Russian
- **Natural Text-to-Speech**: Converts translated text into high-quality voice output
- **Audio Player**: Built-in audio player with playback controls
- **Download Option**: Download generated audio files
- **Modern UI**: Beautiful, responsive interface with gradient design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- (Optional) OpenAI API key for enhanced translation quality

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cravian
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

> **Note**: The app works without an OpenAI API key using a fallback translation service, but OpenAI provides better translation quality.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

1. **Upload PDF**: Click the upload area or drag and drop a PDF file (max 10MB)
2. **Extract Text**: The text will be automatically extracted from your PDF
3. **Select Language**: Choose your target language from the dropdown
4. **Translate & Generate**: Click "Translate & Generate Voice" to process
5. **Listen & Download**: Use the audio player to listen or download the audio file

## 🏗️ Project Structure

```
cravian/
├── app/
│   ├── api/
│   │   ├── extract-text/      # PDF text extraction endpoint
│   │   └── translate-and-tts/ # Translation and TTS endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page
├── components/
│   ├── AudioPlayer.tsx        # Audio player component
│   ├── FileUpload.tsx         # File upload component
│   ├── LanguageSelector.tsx   # Language selection dropdown
│   └── TextPreview.tsx        # Text preview component
├── lib/
│   ├── api.ts                 # API client functions
│   ├── languages.ts           # Language definitions
│   ├── translation.ts         # Translation service
│   └── tts.ts                 # Text-to-speech service
├── public/
│   └── audio/                 # Generated audio files (auto-created)
└── package.json
```

## 🔧 Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **PDF Processing**: pdf-parse
- **Translation**: OpenAI GPT-3.5 (with LibreTranslate fallback)
- **Text-to-Speech**: Google Text-to-Speech (gTTS)

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables (OPENAI_API_KEY)
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

Make sure to:
- Set the `OPENAI_API_KEY` environment variable
- Ensure the `/public/audio` directory is writable (or use cloud storage)

## 📝 API Endpoints

### POST `/api/extract-text`
Extracts text from uploaded PDF file.

**Request:**
- FormData with `file` field (PDF file)

**Response:**
```json
{
  "text": "Extracted text from PDF..."
}
```

### POST `/api/translate-and-tts`
Translates text and generates audio.

**Request:**
- FormData with:
  - `text`: Text to translate
  - `targetLanguage`: Target language code (e.g., 'es', 'fr')
  - `file`: Original PDF file (optional)

**Response:**
```json
{
  "translatedText": "Translated text...",
  "audioUrl": "/audio/audio-1234567890.mp3"
}
```

## 🎯 Supported Languages

| Language | Code | Native Name |
|----------|------|-------------|
| English | en | English |
| Spanish | es | Español |
| French | fr | Français |
| German | de | Deutsch |
| Italian | it | Italiano |
| Portuguese | pt | Português |
| Chinese | zh | 中文 |
| Japanese | ja | 日本語 |
| Korean | ko | 한국어 |
| Hindi | hi | हिन्दी |
| Arabic | ar | العربية |
| Russian | ru | Русский |

## 🔒 Environment Variables

- `OPENAI_API_KEY` (optional): Your OpenAI API key for enhanced translation quality

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or contributions, please open an issue on GitHub.

## 🎥 Demo Video

Create a demo video showcasing:
1. PDF upload
2. Text extraction
3. Language selection
4. Translation process
5. Audio playback
6. Download functionality

---

**Built with ❤️ for the Cerevyn Multilingual PDF/Textbook Voice Translator Challenge**


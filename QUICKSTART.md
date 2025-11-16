# Quick Start Commands

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: (Optional) Set up Environment Variables
Create a `.env.local` file in the root directory:
```bash
# Windows PowerShell
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local

# Or manually create .env.local and add:
# OPENAI_API_KEY=your_openai_api_key_here
```

## Step 3: Run Development Server
```bash
npm run dev
```

## Step 4: Open in Browser
Open [http://localhost:3000](http://localhost:3000) in your browser

---

## Other Useful Commands

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Run Linter
```bash
npm run lint
```

---

## Troubleshooting

### If you get port 3000 already in use:
```bash
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use a different port
npm run dev -- -p 3001
```

### If dependencies fail to install:
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```


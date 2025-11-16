# Fix PowerShell Execution Policy Error

## Quick Fix Options

### Option 1: Use Command Prompt (Easiest - Recommended)
1. Open **Command Prompt** (cmd.exe) instead of PowerShell
2. Navigate to your project:
   ```cmd
   cd C:\Users\SRI LAKSHMI\Desktop\cravian
   ```
3. Run:
   ```cmd
   npm install
   ```

### Option 2: Bypass Policy for Current Session (PowerShell)
Run this command in PowerShell:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```
Then run:
```powershell
npm install
```

### Option 3: Change Policy for Current User (Permanent)
Run PowerShell as Administrator, then:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then run:
```powershell
npm install
```

### Option 4: Bypass for Single Command
```powershell
powershell -ExecutionPolicy Bypass -Command "npm install"
```

---

## Recommended: Use Command Prompt

The easiest solution is to use **Command Prompt (cmd)** instead of PowerShell:

1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate to your project:
   ```cmd
   cd C:\Users\SRI LAKSHMI\Desktop\cravian
   ```
4. Run:
   ```cmd
   npm install
   npm run dev
   ```


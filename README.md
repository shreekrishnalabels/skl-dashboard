# SKL Inquiry Dashboard — Glass Edition

## Deploy to Vercel (Step by Step)

### Step 1 — GitHub pe upload karo
1. github.com pe jao → New Repository → `skl-dashboard`
2. Terminal mein:
```bash
cd skl-dashboard
git init
git add .
git commit -m "SKL Glass Dashboard"
git remote add origin https://github.com/TUMHARA_USERNAME/skl-dashboard.git
git push -u origin main
```

### Step 2 — Vercel deploy
1. vercel.com pe jao → Login with GitHub
2. "New Project" → apna `skl-dashboard` repo select karo
3. Settings:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. "Deploy" click karo → 2 min mein live!

### Step 3 — URL milega
`skl-dashboard.vercel.app` ya custom domain laga sakte ho

## Google Sheet API
`src/constants.js` mein `SHEET_API_URL` already set hai.
Agar change karna ho toh wahan edit karo.

## Local development
```bash
npm install
npm run dev
```

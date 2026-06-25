# Daily Tracker — PWA

A free, mobile-friendly Progressive Web App to track anything daily: lunch, water intake, medication, exercise, or any habit.

## Features
- ✅ Daily yes/no or count-based tracking
- 📅 Calendar history view (month-by-month)
- 📊 Summary with streaks and all-time stats
- 🔔 Push notifications / reminders (works when app is closed)
- 📲 Installable on Android & iOS (Add to Home Screen)
- 💾 All data stored locally — free, no account needed
- 🌙 Dark mode support

---

## Deploy for free on GitHub Pages (5 minutes)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up (free).

### Step 2 — Create a new repository
1. Click the **+** button → **New repository**
2. Name it: `daily-tracker`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload the files
1. Click **Add file** → **Upload files**
2. Upload ALL these files/folders:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - The entire `icons/` folder
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repository **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, select `Deploy from a branch`
4. Select branch: `main`, folder: `/ (root)`
5. Click **Save**

### Step 5 — Open your app
After ~1 minute, your app will be live at:
```
https://YOUR_GITHUB_USERNAME.github.io/daily-tracker/
```

Open this URL on your phone and tap **"Add to Home Screen"** for the full app experience with push notifications.

---

## How to use

### Adding a tracker
Tap **+ Add** → fill in name, type (yes/no or count), optional reminder time.

### Logging today
On the **Today** tab, tap ✓ Yes / ✗ No for each tracker.

### Enabling notifications
When you open the app, tap **Enable** on the notification banner. After that, you'll receive reminders at your set times even when the browser is closed (Android). On iOS, notifications work when the app is installed to Home Screen.

### Viewing history
Go to the **History** tab, select a tracker, and navigate months to see your calendar.

---

## Notes
- Data is stored in your browser's localStorage — it stays on your device.
- If you clear browser data, your logs will be lost. For backup, export via browser DevTools → Application → localStorage.
- Notifications on iOS require iOS 16.4+ and the app to be added to Home Screen.

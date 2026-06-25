const CACHE = 'daily-tracker-v1';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow('./index.html');
    })
  );
});

// Listen for scheduled alarm messages from the page
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATIONS') {
    // Store reminders in IndexedDB via the SW
    storeReminders(e.data.reminders);
  }
});

// Periodic background sync for reminders (where supported)
self.addEventListener('periodicsync', e => {
  if (e.tag === 'check-reminders') {
    e.waitUntil(checkAndNotify());
  }
});

// Also check on push (fallback)
self.addEventListener('push', e => {
  e.waitUntil(checkAndNotify());
});

async function storeReminders(reminders) {
  const db = await openDB();
  const tx = db.transaction('reminders', 'readwrite');
  const store = tx.objectStore('reminders');
  await store.clear();
  for (const r of reminders) await store.put(r);
}

async function checkAndNotify() {
  const db = await openDB();
  const tx = db.transaction('reminders', 'readonly');
  const reminders = await tx.objectStore('reminders').getAll();
  const now = new Date();
  const hhmm = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  const todayKey = now.toISOString().slice(0, 10);

  for (const r of reminders) {
    if (r.time === hhmm) {
      // Check if already logged today
      const logDB = await openDB();
      const logTx = logDB.transaction('logs', 'readonly');
      const log = await logTx.objectStore('logs').get(`${r.id}_${todayKey}`);
      if (log === undefined || log === null) {
        self.registration.showNotification('Daily Tracker', {
          body: `⏰ Time to log: ${r.name}`,
          icon: './icons/icon-192x192.png',
          badge: './icons/icon-72x72.png',
          tag: r.id,
          renotify: false,
          data: { trackerId: r.id }
        });
      }
    }
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('DailyTracker', 1);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('reminders')) db.createObjectStore('reminders', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('logs')) db.createObjectStore('logs');
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

self.addEventListener('message', event => {
  if (event.data === 'vibrate') {
    self.registration.showNotification('Vibración', {
      vibrate: [200, 100, 200, 100, 300],
      silent: true
    });
  }
});

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

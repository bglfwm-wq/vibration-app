self.addEventListener('message', event => {
    if (event.data === 'vibrate') {
        
        // Patrón largo de Halloween: (dum-dum... duuummm... ... DUUUUUUUUM)
        const vibrationPattern = [150, 100, 150, 300, 800, 500, 1500];

        const promise = self.registration.showNotification('¡Es tu turno!', {
            vibrate: vibrationPattern
        });

        promise.then(() => {
            replyToClients({ type: 'vibration_reply', success: true });
        }).catch(err => {
            replyToClients({ type: 'vibration_reply', success: false, error: err.message });
        });
    }
});

function replyToClients(message) {
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
            for (const client of clientList) {
                client.postMessage(message);
            }
        });
}

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

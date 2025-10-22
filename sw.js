self.addEventListener('message', event => {
    if (event.data === 'vibrate') {
        const promise = self.registration.showNotification('Vibración', {
            vibrate: [200, 100, 300, 100, 200],
            silent: true,
            tag: 'vibration-test'
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



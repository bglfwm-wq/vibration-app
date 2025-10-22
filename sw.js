self.addEventListener('message', event => {
    const data = event.data;

    if (data && data.type === 'vibrate') {
        const promise = self.registration.showNotification('¡Vibración!', {
            vibrate: data.pattern 
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

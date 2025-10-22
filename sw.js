self.addEventListener('message', event => {
    const data = event.data;

    if (data && data.type === 'show_alert_notification') {
        
        // El emoji 🎃 se añade directamente al título
        const promise = self.registration.showNotification('🎃 ¡Llamada a Votación!', {
            body: 'Prepárate, eres el siguiente. ¡Tu turno!',
            // La propiedad 'icon' se elimina, ya no es necesaria
        });

        promise.then(() => {
            replyToClients({ type: 'notification_reply', success: true });
        }).catch(err => {
            replyToClients({ type: 'notification_reply', success: false, error: err.message });
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

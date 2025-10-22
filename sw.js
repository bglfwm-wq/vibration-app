self.addEventListener('message', event => {
    const data = event.data;

    if (data && data.type === 'show_alert_notification') {
        
        const title = '🎃 Llamada a participación.';
        const body = 'Prepárate eres el siguiente.';

        const promise = self.registration.showNotification(title, {
            body: body,
            badge: 'badge.png', 
            icon: 'badge.png'
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

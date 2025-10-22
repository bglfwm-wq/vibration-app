self.addEventListener('message', event => {
    // Escucha el mensaje 'vibrate' del index.html
    if (event.data === 'vibrate') {
        
        // --- ¡AQUÍ ESTÁ TU NUEVO PATRÓN! ---
        // Patrón largo de Halloween: (dum-dum... duuummm... ... DUUUUUUUUM)
        const vibrationPattern = [150, 100, 150, 300, 800, 500, 1500];
        // ---------------------------------

        // Muestra la notificación para activar la vibración
        const promise = self.registration.showNotification('¡Es tu turno!', {
            vibrate: vibrationPattern
        });

        // Envía una respuesta de vuelta al index.html
        promise.then(() => {
            replyToClients({ type: 'vibration_reply', success: true });
        }).catch(err => {
            replyToClients({ type: 'vibration_reply', success: false, error: err.message });
        });
    }
});

// Función para responder al index.html
function replyToClients(message) {
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
            for (const client of clientList) {
                client.postMessage(message);
            }
        });
}

// Código estándar del Service Worker para que se active rápido
self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

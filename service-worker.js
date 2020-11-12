importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.precaching.precacheAndRoute([{
        url: "/index.html",
        revision: '1'
    },
    {
        url: "/nav.html",
        revision: '1'
    },
    {
        url: "/offlinesite.html",
        revision: '1'
    },
    {
        url: "pages/About.html",
        revision: '1'
    },
    {
        url: "pages/Favorite.html",
        revision: '1'
    },
    {
        url: "pages/Home.html",

        revision: '1'
    },
    {
        url: "/leaguedetail.html",
        revision: '1'
    },
    {
        url: "/club.html",
        revision: '1'
    },
    {
        url: "/js/api.js",
        revision: '1'
    },
    {
        url: "js/nav.js",
        revision: '1'
    },
    {
        url: "js/materialize.min.js",
        revision: '1'
    },
    {
        url: "js/db.js",
        revision: '1'
    },
    {
        url: "js/idb.js",
        revision: '1'
    },
    {
        url: "js/league_lists.js",
        revision: '1'
    },
    {
        url: "js/leaguedetail.js",
        revision: '1'
    },
    {
        url: "js/main.js",
        revision: '1'
    },
    {
        url: "js/saved.js",
        revision: '1'
    },
    {
        url: "js/club.js",
        revision: '1'
    },
    {
        url: "js/reloadweb.js",
        revision: '1'
    },
    {
        url: "/css/materialize.min.css",
        revision: '1'
    },
    {
        url: "/css/style.css",
        revision: '1'
    },
    {
        url: "/img/512.png",
        revision: '1'
    },
    {
        url: "/img/budi h.jpg",
        revision: '1'
    },
    {
        url: "/img/Bundesliga.png",
        revision: '1'
    },
    {
        url: "/img/Ligue 1.png",
        revision: '1'
    },
    {
        url: "/img/Logo (128).png",
        revision: '1'
    },
    {
        url: "/img/Logo (194).png",
        revision: '1'
    },
    {
        url: "/img/logo(192).png",
        revision: '1'
    },
    {
        url: "/img/logo32.png",
        revision: '1'
    },
    {
        url: "/img/Premier League.png",
        revision: '1'
    },
    {
        url: "/img/Primera Division.png",
        revision: '1'
    },
    {
        url: "/img/Serie A.png",
        revision: '1'
    },
    {
        url: "/img/UEFA Champions League.png",
        revision: '1'
    },
    {
        url: "/img/offline.svg",
        revision: '1'
    },
    {
        url: "/manifest.json",
        revision: '1'
    },
    {
        url: "https://fonts.googleapis.com/icon?family=Material+Icons",
        revision: '1'
    },
    {
        url: "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
        revision: '1'
    }
]);

self.addEventListener("install", (event) => {
    const urls = ['/offlinesite.html'];
    const cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(urls);
        })
    );
});

const url = ['/offlinesite.html'];

workbox.routing.registerRoute(
    new RegExp('/'),
    async ({
        event
    }) => {
        try {
            return await workbox.strategies.networkFirst({
                cacheName: 'PojokBola',
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                    }),
                ],
            }).handle({
                event
            });
        } catch (error) {
            return caches.match(url);
        }
    }
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data-api',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 120,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /\.(?:png|jpx|css|svg)$/,
    workbox.strategies.networkFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 25,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    })
);

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'img/Ligue 1.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (!event.action) {
        // Penguna menyentuh area notifikasi diluar action
        console.log('Notification Click.');
        return;
    }
    switch (event.action) {
        case 'yes-action':
            clients.openWindow('/#Favorite');
            break;
        case 'no-action':
            break;
        default:
            console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
            break;
    }
});
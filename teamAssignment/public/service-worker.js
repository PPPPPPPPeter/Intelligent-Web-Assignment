// let cache = null;
// let dataCacheName = 'data-v1';
// let cacheName = 'appCache-v1';
// let filesToCache = [
//     '/',
//     '/add_sight',
//     '/stylesheets/style.css',
//     '/javascripts/index.js',
//     '/javascripts/add_bird.js'
//
//
//     // add more URLs of assets you want to cache
// ];
//
// self.addEventListener('install', function (e) {
//     console.log('[ServiceWorker] Install');
//     e.waitUntil(
//         caches.open(cacheName).then(function (cacheX) {
//             console.log('[ServiceWorker] Caching app shell');
//             cache = cacheX;
//             return cache.addAll(filesToCache);
//         })
//     );
// });
//
// self.addEventListener('activate', function (e) {
//     console.log('[ServiceWorker] Activate');
//     e.waitUntil(
//         caches.keys().then(function (keyList) {
//             return Promise.all(keyList.map(function (key) {
//                 if (key !== cacheName && key !== dataCacheName) {
//                     console.log('[ServiceWorker] Removing old cache', key);
//                     return caches.delete(key);
//                 }
//             }));
//         })
//     );
//     return self.clients.claim();
// });
//
// self.addEventListener('fetch', function (e) {
//     console.log('[Service Worker] Fetch', e.request.url);
//
//     e.respondWith(
//         caches.match(e.request).then(function (response) {
//             return response || fetch(e.request)
//                 .then(function (response) {
//                     if (!response.ok ||  response.status > 299) {
//                         console.log("error: " + response.status);
//                         return response;
//                     } else {
//                         cache.add(e.request.url);
//                         return response;
//                     }
//                 })
//                 .catch(function (err) {
//                     console.log("error: " + err);
//                 })
//         })
//     );
// });
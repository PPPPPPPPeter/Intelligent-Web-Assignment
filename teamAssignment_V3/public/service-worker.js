let cacheName = 'appCache-v1';
let filesToCache = [
    '/',
    '/add_sight',
    '/stylesheets/style.css',
    '/javascripts/index.js',
    '/javascripts/add_bird.js',
    '/javascripts/index_db.js',
    '/javascripts/bird_sight.js'

    // add more URLs of assets you want to cache
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        // Try the cache first
        caches.match(e.request)
            .then(response => {
                // Fall back to network if not in cache
                return response || fetch(e.request);
            })
    );
});
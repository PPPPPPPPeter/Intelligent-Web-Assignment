/**
 * Service Worker Script
 *
 * Service Workers provide a scriptable network proxy in the web browser
 * to manage the web/HTTP requests programmatically. This script helps
 * in caching and serving assets when the user is offline.
 */

/**
 * Cache name and files to cache
 *
 * cacheName: Name of the cache
 * filesToCache: List of files/URLs to cache for offline use
 */
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

/**
 * Event: install
 * Fired when the service worker is installed
 *
 * Description: Opens the cache and caches all the predefined assets
 */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/**
 * Event: fetch
 * Fired for every request made by the browser
 *
 * Description: Tries to respond with the cached version of the resource,
 * falls back to making a network request if resource is not in cache
 */
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request)
            .then(response => {
                return response || fetch(e.request);
            })
    );
});

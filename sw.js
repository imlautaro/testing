const cacheName = 'testing-cache-v1'

const urlsToCache = ['/', '/css/materialize.min.css', '/js/materialize.min.js']

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(cacheName).then(function (cache) {
			console.log('Opened cache')
			return cache.addAll(urlsToCache)
		})
	)
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			// Cache hit - return response
			if (response) {
				return response
			}
			return fetch(event.request)
		})
	)
})

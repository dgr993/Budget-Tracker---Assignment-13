const CACHE = "my-site-cache-v1";
const DATA_NAME = "data-cache-v1";
const FILES_TO_CACHE = [
    "./index.html",
    "./styles.css",
    "./icons/icon-192x192.png",
    "./icons/icon-512x512.png",
    "./index.js"
];

self.addEventListener("install",(event) => {
    event.waitUntil(
        caches.open(CACHE)
        .then((cache)=> {
            console.log(CACHE);
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener("fetch",(event) => {
    if (event.request.url.includes("/api")){
        event.respondWith(caches.open(
            CACHE
        )
        .then((cache)=> {
            return fetch(event.request(cache))
            .then((response)=> {
                if(response.status===200) {
                    cache.put(event.request.url,response.clone())
                }
                return response
            })
        }))
    }
})


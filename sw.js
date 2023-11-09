const boveda = 'Boveda1';
self.addEventListener('install', e => {
    const recursos = caches.open(boveda).then(cache => {
        cache.add('/'),
        cache.add('index.html'),
        cache.add('addproductos.html'),
        cache.add('createcat.html'),
        cache.add('createproducto.html'),
        cache.add('js/addproductos.js'),
        cache.add('js/categorias.js'),
        cache.add('js/base.js'),
        cache.add('js/createproducto.js'),
        cache.add('js/getCategorias.js'),
        cache.add('js/index.js'),
        cache.add('js/pouchdb-nightly.js'),
        cache.add('js/productos.js'),
        cache.add('js/register.js'),
        cache.add('css/style.css'),
        cache.add('css/index.css'),
        cache.add('css/addproductos.css'),
        cache.add('css/base.css'),
        cache.add('css/bootstrap.min.css'),
        cache.add('css/categorias.css'),
        cache.add('css/createproducto.css'),
        cache.add('sw.js'),
        cache.add('manifest.json'),
        cache.add('icons/32x32.png'),
        cache.add('icons/48x48.png'),
        cache.add('icons/64x64.png'),
        cache.add('icons/72x72.png'),
        cache.add('icons/96x96.png'),
        cache.add('icons/128x128.png'),
        cache.add('icons/256x256.png'),
        cache.add('icons/512x512.png'),
        cache.add('img/productos/aceite.webp'),
        cache.add('img/productos/agua.jpg'),
        cache.add('img/productos/brocoli.jpeg'),
        cache.add('img/productos/cafe.jpeg'),
        cache.add('img/productos/cebolla.jpeg'),
        cache.add('img/productos/cerveza.jpg'),
        cache.add('img/productos/champan.webp'),
        cache.add('img/productos/chocolate.jpg'),
        cache.add('img/productos/coco.jpeg'),
        cache.add('img/productos/crema.jpg'),
        cache.add('img/productos/jabpn.jpg'),
        cache.add('img/productos/papas.jpg'),
        cache.add('img/productos/papel.jpg'),
        cache.add('img/icono.ico')
    })
    e.waitUntil(recursos);
})

// self.addEventListener('fetch', e => {
//   //estrategia 1, acceso solo al cache
//   const respuesta = caches.match(e.request)
//       .then(res => {
//           if (res) return res;
//           console.log('No existe el recurso de caché ->', e.request.url);
//           return fetch(e.request).then(newResp => {
//               caches.open(boveda)
//                   .then(cache => {
//                       cache.put(e.request, newResp)
//                   });
//           });
//       });
//   e.respondWith(respuesta);
// })

//estrategia 3 first network then cache
self.addEventListener('fetch', e => {
    const respuesta = fetch(e.request).then((newResp) => {
        caches.open(boveda)
            .then((cache) => {
                cache.put(e.request, newResp)
            });
        return newResp.clone();
    }).catch(err => {
        return caches.match(e.request);
    })
    e.respondWith(respuesta);
});

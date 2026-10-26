// ==KinoPlugin==
// @id           rayoapp5.enmcine
// @name         ENMCINE
// @author       Rayoapp5
// @version      1.0.0
// @description  Peliculas y Series de ENMCINE
// @icon         https://githubusercontent.com
// @language     es
// @type         movie
// ==KinoPlugin==

// Función que se activa cuando el usuario busca en Kino TV
async function onSearch(query) {
    const url = `https://enmcine.uk{encodeURIComponent(query)}`;
    const items = [];

    try {
        const res = await fetch(url);
        const html = await res.text();
        
        // Usamos DOMParser nativo compatible con el motor de Kino TV
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const elements = doc.querySelectorAll('.item');

        elements.forEach(el => {
            const titleEl = el.querySelector('.title');
            const linkEl = el.querySelector('a');
            const imgEl = el.querySelector('img');

            if (titleEl && linkEl) {
                items.push({
                    id: linkEl.getAttribute('href'), // El ID local es la URL de la película
                    title: titleEl.textContent.trim(),
                    poster: imgEl ? imgEl.getAttribute('src') : '',
                    type: 'movie'
                });
            }
        });
    } catch (error) {
        console.error("Error en la búsqueda de ENMCINE:", error);
    }

    return items;
}

// Función que se activa cuando el usuario hace clic en una película para ver los enlaces de reproducción
async function onGetMediaDetails(id) {
    const streams = [];

    try {
        const res = await fetch(id); // 'id' es la URL de la ficha que guardamos en onSearch
        const html = await res.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const iframes = doc.querySelectorAll('iframe');

        iframes.forEach((iframe, index) => {
            const src = iframe.getAttribute('src');
            if (src) {
                streams.push({
                    name: `Servidor ${index + 1}`,
                    url: src
                });
            }
        });
    } catch (error) {
        console.error("Error obteniendo enlaces de ENMCINE:", error);
    }

    return {
        id: id,
        type: 'movie',
        streams: streams
    };
}

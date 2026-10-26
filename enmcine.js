// ==KinoPlugin==
// @id           rayoapp5.enmcine
// @name         ENMCINE
// @author       Rayoapp5
// @version      1.0.1
// @description  Peliculas y Series de ENMCINE
// @icon         https://githubusercontent.com
// @language     es
// @type         movie
// ==KinoPlugin==

// Configuramos las cabeceras para que la web crea que somos un navegador Chrome real
const requestOptions = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3'
    }
};

async function onSearch(query) {
    const url = `https://enmcine.uk{encodeURIComponent(query)}`;
    const items = [];

    try {
        // Usamos las opciones de cabecera para saltar bloqueos de seguridad
        const res = await fetch(url, requestOptions);
        const html = await res.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const elements = doc.querySelectorAll('.item');

        elements.forEach(el => {
            const titleEl = el.querySelector('.title');
            const linkEl = el.querySelector('a');
            const imgEl = el.querySelector('img');

            if (titleEl && linkEl) {
                items.push({
                    id: linkEl.getAttribute('href'),
                    title: titleEl.textContent.trim(),
                    poster: imgEl ? imgEl.getAttribute('src') : '',
                    type: 'movie'
                });
            }
        });
    } catch (error) {
        console.error("Error en conexión ENMCINE:", error);
    }

    return items;
}

async function onGetMediaDetails(id) {
    const streams = [];

    try {
        const res = await fetch(id, requestOptions);
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
        console.error("Error obteniendo video ENMCINE:", error);
    }

    return {
        id: id,
        type: 'movie',
        streams: streams
    };
}

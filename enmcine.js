
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

// Función nativa que Kino TV llama al usar la barra de búsqueda
async function onSearch(query) {
    const url = `https://enmcine.uk{encodeURIComponent(query)}`;
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const items = [];
    
    $('.item').each((i, el) => {
        const title = $(el).find('.title').text().trim();
        const link = $(el).find('a').attr('href');
        const image = $(el).find('img').attr('src');
        
        // Formato de objeto estrictamente requerido por Kino TV
        items.push({ 
            id: link, // Kino usa la URL de la ficha como ID único local
            title: title, 
            poster: image,
            type: 'movie'
        });
    });
    return items;
}

// Función nativa que Kino TV llama al abrir los detalles de un título
async function onGetMediaDetails(id) {
    const res = await fetch(id); // 'id' contiene la URL del link de la ficha
    const html = await res.text();
    const $ = cheerio.load(html);
    const streams = [];
    
    $('iframe').each((i, el) => {
        streams.push({ 
            name: "Servidor " + (i + 1), 
            url: $(el).attr('src') 
        });
    });
    
    return {
        id: id,
        type: 'movie',
        streams: streams
    };
}

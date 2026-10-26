// ==CloudStream==
// name: ENMCINE
// author: Rayoapp5
// version: 1
// description: Peliculas y Series de ENMCINE
// icon: https://raw.githubusercontent.com/Rayoapp5/cineexp/main/imagen.png
// language: es
// "type": ["movie", "series"],
// ==CloudStream==

async function search(query) {
    const url = `https://www.enmcine.uk/?s=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const results = [];
    
    $('.item').each((i, el) => {
        const title = $(el).find('.title').text().trim();
        const link = $(el).find('a').attr('href');
        const image = $(el).find('img').attr('src');
        results.push({ name: title, url: link, poster: image });
    });
    return results;
}

async function getLinks(url) {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const links = [];
    
    $('iframe').each((i, el) => {
        links.push({ name: "Servidor 1", url: $(el).attr('src') });
    });
    return links;
}

async function loadCatalog(type) {
    const url = type === 'movie' ? 'https://www.enmcine.uk/peliculas/' : 'https://www.enmcine.uk/series/';
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const results = [];
    
    $('.item').each((i, el) => {
        const title = $(el).find('.title').text().trim();
        const link = $(el).find('a').attr('href');
        const image = $(el).find('img').attr('src');
        results.push({ name: title, url: link, poster: image });
    });
    return results;
}
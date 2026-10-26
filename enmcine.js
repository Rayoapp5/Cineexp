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

async function search(query) {
    const url = `https://enmcine.uk{encodeURIComponent(query)}`;
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
    const url = type === 'movie' ? 'https://enmcine.uk' : 'https://enmcine.uk';
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

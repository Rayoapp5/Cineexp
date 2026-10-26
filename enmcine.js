const BASE_URL = "https://www.enmcine.uk";

async function search(query, type, skip = 0) {
    const url = `${BASE_URL}/?s=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const html = await res.text();
    
    const items = [];
    const regex = /<a href="#\/ver\/(.*?)\?titulo=(.*?)".*?<img src="(.*?)"/gs;
    let match;
    
    while ((match = regex.exec(html)) !== null) {
        items.push({
            id: `enm:${decodeURIComponent(match[1])}`,
            type: "movie",
            name: decodeURIComponent(match[2]).replace(/\+/g, "),
            poster: match[3]
        });
    }
    return { metas: items.slice(skip, skip + 20) };
}

async function getStream(id) {
    const slug = id.replace("enm:", "");
    const url = `${BASE_URL}/#/ver/${slug}`;
    const res = await fetch(url);
    const html = await res.text();
    
    const streams = [];
    const iframeRegex = /<iframe[^>]*src="([^"]*)"/g;
    let match;
    
    while ((match = iframeRegex.exec(html)) !== null) {
        streams.push({
            name: "ENMCINE",
            title: "Servidor",
            url: match[1]
        });
    }
    return { streams };
}

module.exports = { search, getStream };
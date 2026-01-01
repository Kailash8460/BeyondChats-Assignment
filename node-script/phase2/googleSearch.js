// currently this is used to get links from google search results - without puppeteer
// if you want to use puppeteer version, use modifiedSearch.js
// copy code from modifiedSearch.js if needed and paste here

import axios from "axios";
import * as cheerio from "cheerio";

export async function googleSearch(query) {
    console.log("Searching the query: ", query);

    const url = "https://www.google.com/search?q=" + encodeURIComponent(query + " blog article");
    const response = await axios.get(url, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' +
                '(KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            'Accept-Language': 'en-US,en;q=0.9',
        }
    });
    const $ = cheerio.load(response.data);
    const links = [];

    $('a').each((index, element) => {
        const href = $(element).attr('href');
        if (!href) {
            return;
        }
        if (href && href.startsWith('/url?q=')) {
            const cleanHref = decodeURIComponent(href.split('/url?q=')[1].split('&')[0]);
            if (
                cleanHref.startsWith('http') &&
                !cleanHref.includes('google.com') &&
                !cleanHref.includes('youtube.com') &&
                !cleanHref.includes('facebook.com') &&
                !cleanHref.includes('twitter.com') &&
                !cleanHref.includes('linkedin.com')
            ) {
                links.push(cleanHref);
            }
        }
    });

    console.log("Filtered Links Found:", links.slice(0, 5));
    return links.slice(0, 2); // Return top 2 links as per the requirement
}
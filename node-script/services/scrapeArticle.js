import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(articleUrl) {
    try {
        console.log("Scraping Article URL: ", articleUrl);

        const response = await axios.get(articleUrl);
        const $ = cheerio.load(response.data);

        const title = $('.entry-title').text().trim();
        const content = $('.entry-content').html()?.trim() || '';
        const author = $('.meta-author span').text().trim();
        const published_date = $('time').attr("datetime");

        return {
            title,
            content,
            author,
            published_date
        };
    } catch (error) {
        console.error('Error scraping article:', error);
        throw error;
    }
}
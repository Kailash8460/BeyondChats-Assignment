import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(articleUrl) {
    try {
        console.log("Scraping Article URL: ", articleUrl);

        const response = await axios.get(articleUrl);
        const $ = cheerio.load(response.data);

        const title = $('.entry-title').text().trim();
        let contentHTML =
            $(".entry-content").html()?.trim() ||
            $(".ct-content").html()?.trim() ||
            $(".entry-card-content").html()?.trim() ||
            "";
        const author = $('.meta-author span').text().trim();
        const published_date = $('time').attr("datetime");

        return {
            title,
            content: contentHTML,
            author,
            published_date
        };
    } catch (error) {
        console.error('Error scraping article:', error);
        throw error;
    }
}
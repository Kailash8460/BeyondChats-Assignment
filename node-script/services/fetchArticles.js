import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL;

export async function fetchArticles() {
    try {
        console.log("Fetching Page Url: ", BASE_URL);

        const response = await axios.get(BASE_URL);
        const $ = cheerio.load(response.data);
        const lastPageLink = $('a.page-numbers').last().attr('href');
        const lastPage = await axios.get(lastPageLink);
        const $$ = cheerio.load(lastPage.data);
        const articles = [];

        $('.entry-card').each((index, element) => {
            const title = $(element).find('.entry-title a').text().trim();
            const url = $(element).find('.entry-title a').attr('href');
            const author = $(element).find('.meta-author span').text().trim();
            const published_date = $(element).find('time').attr("datetime");
            const excerpt = $(element).find('.entry-excerpt p').text().trim();

            articles.push({
                title,
                url,
                author,
                published_date,
                excerpt
            });
        });

        return articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}

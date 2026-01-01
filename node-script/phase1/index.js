import { fetchArticles } from "./fetchArticles.js";
import { scrapeArticle } from "./scrapeArticle.js";
import { publishArticle } from "./publishArticle.js";

(async () => {
    const articles = await fetchArticles();
    console.log(`Found ${articles.length} on the last page.`);

    const oldFive = articles.slice(-5);

    for (const article of oldFive) {
        try {
            const detailedArticle = await scrapeArticle(article.url);
            article.content = detailedArticle.content;
            await publishArticle(article);
        } catch (error) {
            console.error("Failed to process article:", article.title);
        }
    }

    console.log("Script evaluated. Scrapping completed.");
})();
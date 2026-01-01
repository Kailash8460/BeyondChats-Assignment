import { fetchArticles } from "./fetchArticle.js";
import { googleSearch } from "./googleSearch.js";
import { scrapeArticle } from "./scrapeArticle.js";
import { llmRewriteArticle } from "./llmRewrite.js";
import { updateArticle } from "./updateArticle.js";

(async () => {

    const articles = await fetchArticles();
    console.log(`Fetched ${articles.length} articles from Laravel`);
    const oldFive = articles.slice(-5);

    for (const article of oldFive) {
        console.log("\n Processing:", article.title);
        const links = await googleSearch(article.title);
        console.log("Found references:", links);
        const references = [];

        for (const link of links) {
            try {
                const reference = await scrapeArticle(link);
                references.push({ ...reference, url: link });
            } catch {
                console.log("Failed to scrape:", link);
            }
        }

        if (!references.length) {
            console.log("Skipping — no valid references");
            continue;
        }

        const rewritten = await llmRewriteArticle(
            article.content,
            references
        );

        await updateArticle(article.id, rewritten, references);
        console.log("Updated:", article.title);
    }

    console.log("\n Phase-2 Completed");

})();

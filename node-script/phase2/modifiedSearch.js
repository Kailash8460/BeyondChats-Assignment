import puppeteer from "puppeteer";

export async function googleSearch(query) {

    try {
        console.log("Searching:", query);

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/122.0.0.0 Safari/537.36"
        );

        await page.goto(
            "https://www.google.com/search?q=" +
            encodeURIComponent(query + " blog article"),
            { waitUntil: "domcontentloaded" }
        );

        const links = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll("a"));
            return anchors
                .map((a) => a.href)
                .filter(
                    (u) =>
                        u.startsWith("http") &&
                        !u.includes("google.") &&
                        !u.includes("youtube.") &&
                        !u.includes("facebook.") &&
                        !u.includes("linkedin.") &&
                        !u.includes("webcache")
                )
                .slice(0, 2);
        });

        await browser.close();

        console.log("Filtered Links Found: ", links);
        return links;
    } catch (error) {
        console.error("Google Search Error: ", error);
        return [];
    }
}

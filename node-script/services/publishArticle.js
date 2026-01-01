import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.LARAVEL_API;

export async function publishArticle(articleData) {
    try {
        console.log("Posting to:", API_URL);
        console.log("Publishing Article: ", articleData);
        const response = await axios.post(API_URL, {
            title: articleData.title,
            author: articleData.author,
            published_at: articleData.published_date,
            excerpt: articleData.excerpt,
            content: articleData.content,
            source_url: articleData.url
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 422) {
            console.error('Already exists → skipping:', articleData.title);
        } else {
            console.error('Error publishing article:', error.message);
        }
        throw error;
    }
}
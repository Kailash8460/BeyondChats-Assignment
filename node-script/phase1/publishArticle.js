import axios from "axios";
// chaning this because of change in folder structure
// import dotenv from 'dotenv';
// dotenv.config();

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
dotenv.config({ path: path.join(_dirname, '..', '.env') });

const API_URL = process.env.LARAVEL_API;

export async function publishArticle(articleData) {
    try {
        console.log("Posting to:", API_URL);
        console.log("Publishing Article: ", articleData);
        const response = await axios.post(API_URL, {
            title: articleData.title,
            author: articleData.author,
            published_at: articleData.published_date,
            excerpt: articleData.excerpt || "",
            content: articleData.content || "",
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
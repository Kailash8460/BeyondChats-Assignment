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

const API_URL = process.env.LARAVEL_API + "?per_page=50";

export async function fetchArticles() {
    try {
        console.log("Fetching Page Url: ", API_URL);
        const response = await axios.get(API_URL);
        return response.data.data; // Adjusted so it matches Laravel API response structure
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}
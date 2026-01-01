import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
dotenv.config({ path: path.join(_dirname, '..', '.env') });

const API_URL = process.env.LARAVEL_API;

export async function updateArticle(id, updatedContent, references) {
    console.log("Updating article in Laravel...");

    return await axios.put(`${API_URL}/${id}`, {
        is_ai_updated: true,
        updated_content: updatedContent,
        reference_urls: references.map(reference => reference.url),
    });
}

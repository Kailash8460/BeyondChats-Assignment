import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
dotenv.config({ path: path.join(_dirname, '..', '.env') });

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function llmRewriteArticle(originalContent, reference) {
    try {
        console.log("Calling LLM to rewrite article...");
        const prompt = `Rewrite the following article content to improve clarity and engagement, using the style and tone of the reference article provided. Maintain the original meaning and key points.
Original Article:
${originalContent}

Reference Article #1:
${reference[0]?.content || ""}

Reference Article #2:
${reference[1]?.content || ""}

At the bottom, add:

<h3>References</h3>
<ul>
${reference
                .map(r => `<li><a href="${r.url}" target="_blank">${r.url}</a></li>`)
                .join("\n")}
</ul>
`;
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are an expert content rewriter." },
                { role: "user", content: prompt }
            ]
        });
        const rewrittenContent = response.choices[0].message.content.trim();
        return rewrittenContent;
    } catch (error) {
        console.error('Error rewriting article with LLM:', error);
        throw error;
    }
}

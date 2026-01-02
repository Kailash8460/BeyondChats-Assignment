import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, formatDate } from "../api/articles";

const ArticleDetails = () => {

    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [showAI, setShowAI] = useState(true);

    useEffect(() => {
        fetchArticleById(id).then(data => {
            setArticle(data);
            if (!data.updated_content) setShowAI(false);
        });
    }, [id]);

    if (!article) return <div className="text-zinc-300">Loading...</div>;

    const content = showAI && article.updated_content
        ? article.updated_content
        : article.content;
    const hasAI = Boolean(article.updated_content);

    return (
        <div className="rounded-2xl bg-zinc-900/70 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl p-6 text-zinc-200">

            <h1 className="text-2xl font-bold text-white tracking-tight">
                {article.title}
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
                Author - {article.author || "Unknown Author"}
            </p>
            <p className="text-sm text-zinc-400">
                Published - {formatDate(article.published_at)}
            </p>

            <div className="mt-4 flex items-center gap-4">

                <span className="text-xs text-zinc-400">
                    View Version:
                </span>

                <div className={`flex items-center w-28 h-8 rounded-full border transition cursor-pointer ${hasAI ? "border-amber-300/40" : "border-zinc-500/40"}`} onClick={() => hasAI && setShowAI(!showAI)}>

                    <div className={`w-1/2 h-full flex items-center justify-center text-xs font-medium ${!showAI ? "bg-zinc-700 text-white rounded-l-full" : "text-zinc-400"}`}>
                        Original
                    </div>

                    <div className={`w-1/2 h-full flex items-center justify-center text-xs font-medium ${showAI ? "bg-emerald-500/20 text-emerald-300 rounded-r-full" : "text-zinc-400"}`}>
                        AI
                    </div>

                </div>
            </div>

            <hr className="my-5 border-white/10" />

            <p className="text-sm text-zinc-300 mt-3 line-clamp-3 mb-4">
                Excerpt: {article.excerpt || "No excerpt available"}
            </p>

            <div className="prose prose-invert max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />

            <hr className="my-6 border-white/10" />

            <h3 className="text-lg font-semibold text-white mb-2">References</h3>
            {Array.isArray(article.reference_urls) &&
                article.reference_urls.length > 0 ? (
                <ul className="list-disc ml-6 text-amber-300">
                    {article.reference_urls.map((url, i) => (
                        <li key={i}>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                {url}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-zinc-400 text-sm">
                    No reference links available.
                </p>
            )}

        </div>
    );
};

export default ArticleDetails;

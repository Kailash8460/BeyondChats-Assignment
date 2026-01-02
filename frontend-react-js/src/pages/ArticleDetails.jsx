import React from 'react'
import { useEffect, useState } from 'react'
import { fetchArticleById, formatDate } from '../api/articles'
import { useParams } from 'react-router-dom'

const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetchArticleById(id).then(data => setArticle(data));
    }, [id]);

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        // <div>
        //     <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
        //     <p className="text-gray-500 text-sm">Author: {article.author || "Unknown Author"}</p>
        //     <p className="text-gray-500 text-sm">Published: {article.published_date || "Unknown Date"}</p>
        //     {article.is_ai_updated ? (
        //         <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2 mb-2">AI Updated</span>
        //     ) : (
        //         <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mt-2 mb-2">Original Version</span>
        //     )}
        //     <div className="prose max-w-none mt-4" dangerouslySetInnerHTML={{ __html: article.content }}></div>
        // </div>
        <div className="bg-white rounded-xl shadow p-6 border">

            {/* Title */}
            <h1 className="text-3xl font-bold mb-2">
                {article.title}
            </h1>

            {/* Meta */}
            <div className="text-sm text-gray-500 flex gap-4">
                <span>Author: {article.author || "Unknown Author"}</span>
                <span>Published: {formatDate(article.published_at)}</span>
            </div>

            {/* Status Tag */}
            {article.is_ai_updated ? (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-3">
                    AI Updated Version
                </span>
            ) : (
                <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mt-3">
                    Original Article
                </span>
            )}

            {/* Divider */}
            <hr className="my-4" />

            {/* Article Content */}
            <div
                className="prose max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{
                    __html: article.updated_content || article.content
                }}
            />

            {/* References Section */}
            {Array.isArray(article.reference_urls) &&
                article.reference_urls.length > 0 && (
                    <div className="mt-8 p-4 rounded-lg bg-gray-50 border">
                        <h3 className="font-semibold text-lg mb-2">References</h3>

                        <ul className="list-disc ml-5 text-blue-600">
                            {article.reference_urls.map((url, idx) => (
                                <li key={idx}>
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        {url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    )
}

export default ArticleDetails

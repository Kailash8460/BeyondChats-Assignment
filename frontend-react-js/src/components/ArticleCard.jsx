import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../api/articles'

const ArticleCard = (props) => {
    return (
        <div className="bg-white rounded-xl shadow p-4 border">
            <h2 className="text-xl font-bold mb-2">{props.article.title}</h2>
            <p className="text-gray-500 text-sm">Author: {props.article.author || "Unknown Author"}</p>
            <p className="text-gray-500 text-sm">Published: {formatDate(props.article.published_at)}</p>
            {props.article.is_ai_updated ? (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2 mb-2">AI Updated</span>
            ) : (
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mt-2 mb-2">Original Version</span>
            )}
            {/* <p className="text-gray-700 mb-2">{props.article.content}</p> */}
            <p className="text-gray-700 text-sm line-clamp-2 mt-2">{props.article.excerpt || "No excerpt available"}</p>
            <Link to={`/articles/${props.article.id}`} className="text-blue-500 hover:underline">View Details</Link>
        </div>
    )
}

export default ArticleCard

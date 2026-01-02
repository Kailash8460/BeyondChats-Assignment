import React from 'react'
import { useEffect, useState } from 'react'
import { fetchArticles } from '../api/articles'
import ArticleCard from '../components/ArticleCard'

const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles().then(data => setArticles(data));
    }, []);
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    )
}

export default ArticleList

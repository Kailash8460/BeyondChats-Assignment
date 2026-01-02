import React from 'react'
import { useEffect, useState } from 'react'
import { fetchArticles } from '../api/articles'
import ArticleCard from '../components/ArticleCard'

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchArticles().then(data => setArticles(data));
    }, []);

    return (
        <div>

            <h1 className="text-2xl font-extrabold text-amber-300 tracking-wide mb-6">
                Articles
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map(a => (
                    <ArticleCard key={a.id} article={a} />
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">

                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 rounded-xl bg-zinc-800 border border-white/10 text-zinc-300 disabled:opacity-40">
                    ← Previous
                </button>

                <button onClick={() => setPage(page + 1)} className="px-4 py-2 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-300">
                    Next →
                </button>

            </div>
        </div>
    )
}

export default ArticleList

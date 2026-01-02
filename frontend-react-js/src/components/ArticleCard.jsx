import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../api/articles'

const ArticleCard = (props) => {
    return (
        <div className=" rounded-2xl bg-zinc-900/70 border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl transition duration-200 hover:border-amber-300/40 hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.7)] p-5 text-zinc-200 flex flex-col justify-between">

            <div>
                <h2 className="text-lg font-semibold text-white tracking-tight">
                    {props.article.title}
                </h2>

                <div className="mt-1 text-sm text-zinc-400">
                    <p>Author - {props.article.author || "Unknown Author"}</p>
                    <p>Published - {formatDate(props.article.published_at)}</p>
                </div>

                <div className="mt-3">
                    {props.article.is_ai_updated ? (
                        <span className="px-2 py-1 text-[10px] rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30">
                            AI Updated
                        </span>
                    ) : (
                        <span className="px-2 py-1 text-[10px] rounded-full bg-zinc-700/40 text-zinc-300 border border-zinc-500/40">
                            Original Version
                        </span>
                    )}
                </div>

                <p className="text-sm text-zinc-300 mt-3 line-clamp-3">
                    {props.article.excerpt || "No excerpt available"}
                </p>
            </div>

            <div className="mt-4 pt-2 border-t border-white/10">
                <Link to={`/articles/${props.article.id}`} className="inline-block text-amber-300 hover:text-amber-200 font-medium">
                    View Details →
                </Link>
            </div>
        </div>
    )
}

export default ArticleCard

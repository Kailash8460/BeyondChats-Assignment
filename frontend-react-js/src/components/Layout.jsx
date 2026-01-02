import React from 'react'

const Layout = (props) => {
    return (
        <div className="min-h-screen bg-linear-to-b from-zinc-950 to-zinc-900">
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-900/70 border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h1 className="text-amber-300 font-extrabold tracking-wide">
                        BeyondChats — Articles Dashboard
                    </h1>
                </div>
            </header>
            <main className="max-w-5xl mx-auto p-6">{props.children}</main>
        </div>
    )
}

export default Layout

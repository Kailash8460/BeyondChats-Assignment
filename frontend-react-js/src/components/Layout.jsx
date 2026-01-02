import React from 'react'

const Layout = (props) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-black text-white p-4 text-center text-xl font-semibold">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-400">BeyondChats — Articles Dashboard</h1>
                </div>
            </header>
            <main className="max-w-5xl mx-auto p-6">{props.children}</main>
        </div>
    )
}

export default Layout

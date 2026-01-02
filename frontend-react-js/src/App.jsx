import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ArticleList from './pages/ArticleList'
import ArticleDetails from './pages/ArticleDetails'

const App = () => {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles/:id" element={<ArticleDetails />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App

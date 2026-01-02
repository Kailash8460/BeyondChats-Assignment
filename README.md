# BeyondChats - AI Assisted Article Enhancement System

A full-stack assignment project built as part of the BeyondChats evaluation.

This project automates:

- Scraping the oldest articles from BeyondChats blog  
- Storing them in a Laravel backend with CRUD APIs  
- Searching Google for related top-ranking articles  
- Scraping reference blog content  
- Rewriting the article using an LLM (AI Assist Mode)  
- Republishing updated version back to database  
- Displaying Original vs AI-Updated article versions in a React frontend

---

## Project Overview

The project is implemented in **3 phases** as required:

### Phase - 1: Scraping + Storage + APIs (Laravel)

1. Scrape the **oldest 5 articles** from  
   https://beyondchats.com/blogs/

2. Extract & store:

- title  
- slug  
- author  
- published date  
- excerpt  
- full HTML content  
- URL  

3. Save to MySQL database

4. Build REST CRUD APIs:

- GET /api/articles
- GET /api/articles/{id}
- POST /api/articles
- PUT /api/articles/{id}
- DELETE /api/articles/{id}

Additional stored fields:

- is_ai_updated (boolean)
- updated_content (nullable)
- reference_urls (json)

Duplicate articles prevented using slug validation.

---

### Phase - 2: AI Rewrite Automation (NodeJS Script)

For each stored article:

1. Fetch article from Laravel API
2. Search Google for its title
3. Extract top 2 **external reference blog links**
4. Scrape main article content from those links
5. Call LLM API to rewrite content:

- Preserve meaning
- Improve clarity & structure
- Align style with reference articles
- Append **References section**

6. Save updated content back to Laravel
7. Mark article as:

- is_ai_updated = true

If LLM quota unavailable -> fallback safe-rewrite mode applied.

The script is idempotent and skips already-updated records.

---

### Phase - 3: React Frontend UI

Frontend pages:

#### Articles List Page

Displays:

- Article Title
- Author
- Published Date (formatted)
- Version Badge:
  - Original Version
  - AI Updated Version
- Excerpt preview
- Glass-UI styled card layout
- View Details button
- Pagination support

Responsive grid design (mobile -> desktop).

---

#### Article Details Page

Features:

- Toggle between:
  - Original Content | AI Updated Content

- Shows references (if available)
- Renders HTML safely with `dangerouslySetInnerHTML`
- Displays metadata:

  - Title
  - Author
  - Published date
  - Version status

- Fallback messaging shown when:

  - No AI version exists
  - No references available

---

## Tech Stack

### Backend (Phase - 1)

- Laravel
- MySQL
- REST API
- Eloquent ORM

---

### Automation Script (Phase - 2)

- NodeJS
- Axios
- Puppeteer (Google scraping)
- Cheerio (HTML parsing)
- OpenAI API (LLM rewrite)
- dotenv

---

### Frontend (Phase - 3)

- ReactJS (Vite)
- React Router
- Axios
- Tailwind CSS 

---

## Repository Structure

#### Laravel Backend Folder:

  - /laravel-backend
    - app/
      - Models/Article.php
      - Http/Controllers/ArticleController.php
    - routes/api.php
    - database/migrations/2025_12_31_134907_create_articles_table.php

#### NodeJS Script Folder:

  - /node-script
    - /phase1 (scraping + publishing)
      - fetchArticles.js
      - index.js
      - publishArticle.js
      - scrapeArticle.js
    - /phase2 (AI rewrite pipeline)
      - fetchArticle.js
      - googleSearch.js (without puppeteer)
      - index.js
      - llmRewrite.js
      - modifiedSearch.js (with puppeteer - just copy/paste code to googleSearch.js)
      - scrapeArticle.js
      - updateArticle.js

#### Frontend ReactJS Folder:

  - /react-frontend
    - src/
      - api/articles.js
      - pages/
        - ArticleDetails.jsx
        - ArticleList.jsx
      - components/
        - ArticleCard.jsx
        - Layout.jsx

---

## Author

Kailash Bhagchandani

---

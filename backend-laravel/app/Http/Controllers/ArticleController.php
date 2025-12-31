<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the article resource.
     */
    public function index()
    {
        //
        return response()->json(Article::orderBy('created_at', 'desc')->paginate(10));
    }

    /**
     * Store a newly created article resource in storage.
     */
    public function store(Request $request)
    {
        //
        $data = $request->validate([
            'title' => 'required|string',
            'slug' => 'nullable|string|unique:articles,slug',
            'author' => 'nullable|string',
            'published_at' => 'nullable|date',
            'source_url' => 'required|url|unique:articles,source_url',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
        ]);

        // creating slug if not provided
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        $article = Article::create($data);
        return response()->json($article, 201);
    }

    /**
     * Display the specified article resource.
     */
    public function show(string $id)
    {
        //
        return response()->json(Article::findOrFail($id));
    }

    /**
     * Update the specified article resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $article = Article::findOrFail($id);

        $data = $request->validate([
            'title' => 'sometimes|required|string',
            'slug' => 'sometimes|required|string|unique:articles,slug,' . $article->id,
            'author' => 'sometimes|nullable|string',
            'published_at' => 'sometimes|nullable|date',
            'source_url' => 'sometimes|required|url|unique:articles,source_url,' . $article->id,
            'excerpt' => 'sometimes|nullable|string',
            'content' => 'sometimes|nullable|string',
            'is_ai_updated' => 'sometimes|boolean',
            'updated_content' => 'sometimes|nullable|string',
            'reference_urls' => 'sometimes|nullable|array',
        ]);

        $article->update($data);
        return response()->json($article);
    }

    /**
     * Remove the specified article resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'Article deleted successfully.']);
    }
}
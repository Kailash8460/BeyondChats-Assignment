<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    // The article model fields representing the articles table
    protected $fillable = [
        'title',
        'slug',
        'author',
        'published_at',
        'source_url',
        'excerpt',
        'content',
        'is_ai_updated',
        'updated_content',
        'reference_urls',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_ai_updated' => 'boolean',
        'reference_urls' => 'array',
    ];
}
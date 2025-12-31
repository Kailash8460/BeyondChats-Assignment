<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            // Basic info
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('author')->nullable();
            $table->dateTime('published_at')->nullable();
            $table->string('source_url')->unique();
            // Content fields
            $table->text('excerpt')->nullable();
            $table->longText('content')->nullable();
            // For phase-2 rewritten articles
            $table->boolean('is_ai_updated')->default(false);
            $table->longText('updated_content')->nullable();
            $table->json('reference_urls')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
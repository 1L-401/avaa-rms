<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('job_postings', function (Blueprint $table) {
        $table->id();
        $table->string('initials', 5);
        $table->string('color', 7);
        $table->string('title');
        $table->string('company');
        $table->string('location');
        $table->string('time_ago');
        $table->string('type'); // e.g., Full-time
        $table->json('tags');   // Stores ['React', 'TypeScript']
        $table->string('salary');
        $table->text('description');
        $table->json('what_youll_do');
        $table->json('why_company');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};

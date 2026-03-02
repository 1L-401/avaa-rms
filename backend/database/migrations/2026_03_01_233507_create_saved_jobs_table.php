<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('saved_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Use 'job_postings' instead of the default 'jobs'
            $table->foreignId('job_id')
                ->constrained('job_postings')
                ->onDelete('cascade');

            $table->timestamps();
            $table->unique(['user_id', 'job_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saved_jobs');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPosting extends Model
{
    // Point to the specific table name
    protected $table = 'job_postings';

    // Allow these to be treated as arrays instead of strings
    protected $casts = [
        'tags' => 'array',
        'what_youll_do' => 'array',
        'why_company' => 'array',
    ];
}
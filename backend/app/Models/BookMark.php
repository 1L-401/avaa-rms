<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    // If your table in MySQL is 'saved_jobs', add this line:
    protected $table = 'saved_jobs'; 

    protected $fillable = ['user_id', 'job_id'];
}
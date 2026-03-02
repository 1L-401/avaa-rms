<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookMark;
use App\Models\JobPosting; // Import your JobPosting model

class BookmarkController extends Controller
{
    /**
     * Get only the IDs (Useful for the Dashboard heart logic)
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $bookmarkIds = BookMark::where('user_id', $user->id)->pluck('job_id');
        return response()->json($bookmarkIds);
    }

    /**
     * Get full Job Details (Useful for the Saved Jobs Page)
     */
    public function getSavedJobs(Request $request)
    {
        $user = $request->user();

        // Join with job_postings to get the actual job data
        $jobs = JobPosting::whereIn('id', function($query) use ($user) {
            $query->select('job_id')
                  ->from('saved_jobs')
                  ->where('user_id', $user->id);
        })->get();

        return response()->json([
            'success' => true,
            'data' => $jobs
        ]);
    }

    public function toggleBookmark(Request $request, $jobId)
    {
        $user = $request->user();
        
        $bookmark = BookMark::where('user_id', $user->id)
                            ->where('job_id', $jobId)
                            ->first();

        if ($bookmark) {
            $bookmark->delete();
            return response()->json(['saved' => false]);
        }

        BookMark::create([
            'user_id' => $user->id,
            'job_id' => $jobId
        ]);

        return response()->json(['saved' => true]);
    }
}
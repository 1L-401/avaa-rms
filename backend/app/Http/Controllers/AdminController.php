<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        // Placeholder login logic
        return response()->json([
            'message' => 'Admin login successful',
            'token' => 'mock-admin-token'
        ]);
    }

    public function dashboard()
    {
        // Placeholder dashboard data
        return response()->json([
            'stats' => [
                'users' => 1234,
                'jobs' => 56,
                'applications' => 892
            ]
        ]);
    }
}

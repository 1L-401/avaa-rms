<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
// Import the Social Auth Controller
use App\Http\Controllers\SocialAuthController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    // Standard Auth Routes
    Route::post('register', [AuthController::class , 'register']);
    Route::post('login', [AuthController::class , 'login']);
    Route::post('verify-otp', [AuthController::class , 'verifyOtp']);
    Route::post('resend-otp', [AuthController::class , 'resendOtp']);
    Route::post('forgot-password', [AuthController::class , 'forgotPassword']);
    Route::post('reset-password', [AuthController::class , 'resetPassword']);

    // --- Social Authentication Routes ---
    // Google
    Route::get('google', [SocialAuthController::class, 'redirectToGoogle']);
    Route::get('google/callback', [SocialAuthController::class, 'handleGoogleCallback']);
    
    // LinkedIn
    Route::get('linkedin', [SocialAuthController::class, 'redirectToLinkedIn']);
    Route::get('linkedin/callback', [SocialAuthController::class, 'handleLinkedInCallback']);
    // -------------------------------------

    // Protected Auth Routes
    Route::post('logout', [AuthController::class , 'logout'])->middleware('auth:api');
    Route::post('refresh', [AuthController::class , 'refresh'])->middleware('auth:api');
    Route::post('me', [AuthController::class , 'me'])->middleware('auth:api');
    Route::put('profile', [AuthController::class , 'updateProfile'])->middleware('auth:api');
    Route::put('change-password', [AuthController::class , 'changePassword'])->middleware('auth:api');
});

Route::group([
    'prefix' => 'admin'
], function ($router) {
    // Public admin route
    Route::post('login', [App\Http\Controllers\AdminController::class, 'login']);

    // Protected admin routes (requires JWT + admin role)
    Route::group(['middleware' => ['auth:api', 'admin']], function () {
        Route::post('me', [App\Http\Controllers\AdminController::class, 'me']);
        Route::post('logout', [App\Http\Controllers\AdminController::class, 'logout']);
        Route::get('dashboard', [App\Http\Controllers\AdminController::class, 'dashboard']);

        // User management
        Route::get('users', [App\Http\Controllers\AdminController::class, 'users']);
        Route::get('users/{id}', [App\Http\Controllers\AdminController::class, 'showUser']);
        Route::put('users/{id}', [App\Http\Controllers\AdminController::class, 'updateUser']);
        Route::delete('users/{id}', [App\Http\Controllers\AdminController::class, 'deleteUser']);
    });
});
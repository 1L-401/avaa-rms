<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', [AuthController::class , 'register']);
    Route::post('login', [AuthController::class , 'login']);
    Route::post('verify-otp', [AuthController::class , 'verifyOtp']);
    Route::post('resend-otp', [AuthController::class , 'resendOtp']);
    Route::post('logout', [AuthController::class , 'logout'])->middleware('auth:api');
    Route::post('refresh', [AuthController::class , 'refresh'])->middleware('auth:api');
    Route::post('me', [AuthController::class , 'me'])->middleware('auth:api');
});

Route::group([
    'prefix' => 'admin'
], function ($router) {
    Route::post('login', [App\Http\Controllers\AdminController::class , 'login']);
    Route::get('dashboard', [App\Http\Controllers\AdminController::class , 'dashboard']);
});

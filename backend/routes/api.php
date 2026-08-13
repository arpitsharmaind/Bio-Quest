<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SlideController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API
|--------------------------------------------------------------------------
*/
Route::get('/products', [ProductController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'showBySlug']);
Route::get('/slides', [SlideController::class, 'index']);
Route::get('/settings', [SettingController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);

Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Admin API (Sanctum protected)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('admin')->group(function () {
        // Categories
        Route::get('/categories', [CategoryController::class, 'adminIndex']);
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

        // Products
        Route::get('/products', [ProductController::class, 'adminIndex']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::get('/products/{product}', [ProductController::class, 'show']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);

        // Hero slides (image upload via multipart POST)
        Route::get('/slides', [SlideController::class, 'adminIndex']);
        Route::post('/slides', [SlideController::class, 'store']);
        Route::post('/slides/{slide}', [SlideController::class, 'update']);
        Route::delete('/slides/{slide}', [SlideController::class, 'destroy']);

        // Site settings (contact info, etc.)
        Route::put('/settings', [SettingController::class, 'update']);

        // Contact submissions
        Route::get('/contacts', [ContactController::class, 'index']);
        Route::patch('/contacts/{contact}/read', [ContactController::class, 'markRead']);
        Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);
    });
});

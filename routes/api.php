<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\GoogleAuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PropertyController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/google', [GoogleAuthController::class, 'login']);
Route::apiResource('orders',OrderController::class);
Route::apiResource('users',UserController::class);
Route::apiResource('properties',PropertyController::class);
Route::patch('/users/{user}/avatar', [UserController::class, 'updateAvatar']);
Route::delete('/users/{user}/avatar', [UserController::class, 'deleteAvatar']);
Route::delete('/users', [UserController::class, 'deleteAllUsers']);
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
Route::get('/user/profile', [UserController::class, 'getProfile'])->middleware('auth:sanctum');
Route::patch('/user/profile', [UserController::class, 'updateProfile'])->middleware('auth:sanctum');

Route::post('/auth/google', [GoogleAuthController::class, 'login']);
Route::get('/orders/total-clients', [OrderController::class, 'getTotalClients']);
Route::get('/orders/total-price', [OrderController::class, 'getTotalPrice']);
Route::get('/orders/get-user-by-id/{user}', [OrderController::class, 'getOrdersByUserId']);
Route::delete('/orders/delete-multiple', [OrderController::class, 'deleteMultipleOrders']);
Route::patch('/orders/change-status/{order}', [OrderController::class, 'changeStatus']);
Route::apiResource('orders',OrderController::class);

Route::get('/users/agents', [UserController::class, 'getAgents']);
Route::get('/users/total-agents', [UserController::class, 'getAgentsCount']);
Route::get('/users/agents-statistics', [UserController::class, 'agentsStatistics']);
Route::get('/users/{user}', [UserController::class, 'getSingleAgent']);
Route::post('/users/agents', [UserController::class, 'createAgent']);
Route::delete('/users/agents/{user}', [UserController::class, 'deleteAgent']);
Route::apiResource('users',UserController::class);
Route::apiResource('properties',PropertyController::class);
Route::patch('/users/{user}/avatar', [UserController::class, 'updateAvatar']);
Route::delete('/users/{user}/avatar', [UserController::class, 'deleteAvatar']);
Route::delete('/users', [UserController::class, 'deleteAllUsers']);
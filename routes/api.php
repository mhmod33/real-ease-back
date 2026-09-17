<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\GoogleAuthController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\PropertyRatingController;
use App\Http\Controllers\Api\AgentRatingController;
use App\Http\Controllers\Api\DashboardController;

// Public authentication endpoints.
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/google', [GoogleAuthController::class, 'login']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    // Authenticated user profile and account endpoints.
    Route::get('/user', function (Request $request) { return $request->user();})->middleware('auth:sanctum');
    Route::get('/user/profile', [UserController::class, 'getProfile'])->middleware('auth:sanctum');
    Route::patch('/user/profile', [UserController::class, 'updateProfile'])->middleware('auth:sanctum');
    Route::delete('/auth/delete-account', [UserController::class, 'deleteProfile'])->middleware('auth:sanctum');

    // Order management and order statistics.
    Route::get('/orders/total-clients', [OrderController::class, 'getTotalClients']);
    Route::get('/orders/total-price', [OrderController::class, 'getTotalPrice']);
    Route::get('/orders/get-user-by-id/{user}', [OrderController::class, 'getOrdersByUserId']);
    Route::delete('/orders/delete-multiple', [OrderController::class, 'deleteMultipleOrders']);
    Route::patch('/orders/change-status/{order}', [OrderController::class, 'changeStatus']);
    Route::apiResource('orders', OrderController::class);

    // Agent management and user administration.
    Route::get('/users/agents', [UserController::class, 'getAgents']);
    Route::get('/users/total-agents', [UserController::class, 'getAgentsCount']);
    Route::get('/users/agents-statistics', [UserController::class, 'agentsStatistics']);
    Route::get('/users/{user}', [UserController::class, 'getSingleAgent']);
    Route::post('/users/agents', [UserController::class, 'createAgent']);
    Route::delete('/users/agents/{user}', [UserController::class, 'deleteAgent']);
    Route::apiResource('users', UserController::class);
    Route::patch('/users/{user}/avatar', [UserController::class, 'updateAvatar']);
    Route::delete('/users/{user}/avatar', [UserController::class, 'deleteAvatar']);
    Route::delete('/users', [UserController::class, 'deleteAllUsers']);

    // Property listings and property details.
    Route::apiResource('properties', PropertyController::class);

    // Property and agent ratings.
    Route::get('/properties/{property}/ratings', [PropertyRatingController::class, 'index']);
    Route::post('/properties/{property}/ratings', [PropertyRatingController::class, 'store']);
    Route::get('/agents/{agent}/ratings', [AgentRatingController::class, 'index']);
    Route::post('/agents/{agent}/ratings', [AgentRatingController::class, 'store']);

    // Dashboard metrics and chart data.
    Route::get('/dashboard/kpi-card', [DashboardController::class, 'kpiCard']);
    Route::get('/dashboard/line-chart-data', [DashboardController::class, 'lineChartData']);
    Route::get('/dashboard/top-properties', [DashboardController::class, 'topProperties']);
    Route::get('/dashboard/top-agents', [DashboardController::class, 'topAgents']);
});

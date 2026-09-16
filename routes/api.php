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
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/user/profile', [UserController::class, 'getProfile'])->middleware('auth:sanctum');
Route::patch('/user/profile', [UserController::class, 'updateProfile'])->middleware('auth:sanctum');

Route::post('/auth/google', [GoogleAuthController::class, 'login']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::delete('/auth/delete-account', [UserController::class, 'deleteProfile'])->middleware('auth:sanctum');

Route::post('/auth/register', [AuthController::class, 'register']);
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
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/properties/{property}/ratings', [PropertyRatingController::class, 'index']);
    Route::post('/properties/{property}/ratings', [PropertyRatingController::class, 'store']);
    Route::get('/agents/{agent}/ratings', [AgentRatingController::class, 'index']);
    Route::post('/agents/{agent}/ratings', [AgentRatingController::class, 'store']);
});

Route::get('/dashboard/kpi-card', [\App\Http\Controllers\Api\DashboardController::class, 'kpiCard']);
Route::get('/dashboard/line-chart-data', [\App\Http\Controllers\Api\DashboardController::class, 'lineChartData']);
Route::get('/dashboard/top-properties', [\App\Http\Controllers\Api\DashboardController::class, 'topProperties']);
Route::get('/dashboard/top-agents', [\App\Http\Controllers\Api\DashboardController::class, 'topAgents']);
Route::patch('/users/{user}/avatar', [UserController::class, 'updateAvatar']);
Route::delete('/users/{user}/avatar', [UserController::class, 'deleteAvatar']);
Route::delete('/users', [UserController::class, 'deleteAllUsers']);
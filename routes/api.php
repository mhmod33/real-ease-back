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
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\MessageController;
// Public authentication endpoints.
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/google', [GoogleAuthController::class, 'login']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    // Authenticated user profile and account endpoints.
    // Route::get('/user', function (Request $request) { return $request->user();})->middleware('auth:sanctum');
    Route::get('/user/profile', [UserController::class, 'getProfile'])->middleware('auth:sanctum');
    Route::patch('/user/profile', [UserController::class, 'updateProfile'])->middleware('auth:sanctum');
    Route::delete('/auth/delete-account', [UserController::class, 'deleteProfile'])->middleware('auth:sanctum');

    //notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

    // Order management and order statistics.
    Route::apiResource('orders', OrderController::class);
    Route::get('/messages', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::get('/messages/conversations', [MessageController::class, 'myConversations']);
    Route::get('/messages/property/{property}', [MessageController::class, 'conversation']);
    Route::patch('/messages/{message}/read', [MessageController::class, 'markAsRead']);
    Route::middleware('role:admin')->group(function () {
        Route::get('/orders/total-clients', [OrderController::class, 'getTotalClients']);
        Route::get('/orders/total-price', [OrderController::class, 'getTotalPrice']);
        Route::get('/orders/get-user-by-id/{user}', [OrderController::class, 'getOrdersByUserId']);
        Route::delete('/orders/delete-multiple', [OrderController::class, 'deleteMultipleOrders']);
        Route::patch('/orders/change-status/{order}', [OrderController::class, 'changeStatus']);
   
        // Agent management and user administration.
        Route::get('/users/agents', [UserController::class, 'getAgents']);
        Route::get('/users/total-agents', [UserController::class, 'getAgentsCount']);
        Route::get('/users/agents-statistics', [UserController::class, 'agentsStatistics']);
        Route::get('/users/{user}', [UserController::class, 'getSingleAgent']);
        Route::post('/users/agents', [UserController::class, 'createAgent']);
        Route::delete('/users/agents/{user}', [UserController::class, 'deleteAgent']);
        Route::apiResource('users', UserController::class);
        Route::delete('/users', [UserController::class, 'deleteAllUsers']);
   
        // Property listings and property details.
        Route::patch('/properties/change-status/{property}', [PropertyController::class, 'changeStatus']);
        Route::apiResource('properties', PropertyController::class);
        
        // Dashboard metrics and chart data.
        Route::get('/dashboard/kpi-card', [DashboardController::class, 'kpiCard']);
        Route::get('/dashboard/line-chart-data', [DashboardController::class, 'lineChartData']);
        Route::get('/dashboard/top-properties', [DashboardController::class, 'topProperties']);
        Route::get('/dashboard/top-agents', [DashboardController::class, 'topAgents']);
        Route::get('/dashboard/properties-location-map', [DashboardController::class, 'propertiesLocationMap']);
        Route::get('/dashboard/properties-overview-card', [DashboardController::class, 'propertiesOverview']);
    });

    Route::patch('/users/{user}/avatar', [UserController::class, 'updateAvatar']);
    Route::delete('/users/{user}/avatar', [UserController::class, 'deleteAvatar']);


    // Property and agent ratings.
    Route::get('/properties/{property}/ratings', [PropertyRatingController::class, 'index']);
    Route::post('/properties/{property}/ratings', [PropertyRatingController::class, 'store']);
    Route::get('/agents/{agent}/ratings', [AgentRatingController::class, 'index']);
    Route::post('/agents/{agent}/ratings', [AgentRatingController::class, 'store']);

});

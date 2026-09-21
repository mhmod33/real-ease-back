<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
{
    $notifications = $request->user()->notifications()->paginate(15);

    $notifications->transform(function ($notification) {
        return $notification->data;
    });

    return response()->json([
        'message' => 'Notifications retrieved successfully',
        'data' => $notifications->items(),
        'pagination' => [
            'total' => $notifications->total(),
            'per_page' => $notifications->perPage(),
            'current_page' => $notifications->currentPage(),
        ],
    ], 200);
}

    public function unReadCount(Request $request){
        $unreadCount=$request->user()->unreadNotifications()->count();
        return response()->json([
            'message' => 'Unread notifications count retrieved successfully',
            'data' => $unreadCount
        ], 200);
    }

    public function markAsRead(Request $request, string $id){
        $notification=$request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        return responsee()->json([
            'message' => 'Notification marked as read successfully',
            'data' => $notification
        ], 200);
    }

    public function markAllAsRead(Request $request){
        $unReadNotifications=$request->user()->unReadNotifications();
        $unReadNotifications->markAsRead();

        return response()->json([
            'message' => 'All notifications marked as read successfully',
            'data' => $unReadNotifications
        ], 200);
    }
}

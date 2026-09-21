<?php

namespace App\Http\Controllers\Api;

use App\Models\message;
use Illuminate\Http\Request;
use App\Http\Resources\MessageResource;
use App\Http\Requests\Api\StoreMessageRequest;
use App\Models\Property;
use App\Http\Controllers\Controller;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $messages =Message::where( function ($q) use ($request){
        $q->where('receiver_id',$request->user()->id)
            ->orWhere('sender_id',$request->user()->id);
        })
        ->with(['property_id','sender_id','receiver_id'])
        ->orderBy('created_at')
        ->get();


        return response()->json([
            'message'=>'Messages retrieved successfully',
            'data'=> MessageResource::collection($messages)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        $property = Property::findOrFail($request->property_id);
        $currentUser = $request->user();

        $receiverId = ($currentUser->id === $property->user_id)
            ? $request->receiver_id
            : $property->user_id;

        $message = Message::create([
            'property_id' => $property->id,
            'sender_id' => $currentUser->id,
            'receiver_id' => $receiverId,
            'message' => $request->message,
        ]);

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(message $message)
    {
        //
    }


    public function conversation(Request $request, Property $property)
    {
        $currentUser = $request->user();

        $messages= Message::where('property_id',$property->id) 
        ->where(function ($q) use ($currentUser) {
            $q->where('sender_id',$currentUser->id)
            ->orwhere('receiver_id',$currentUser->id);
            })
            ->orderBy('created_at')
            ->get();
            
            return response ()->json([
                'message' => 'Conversation retrieved successfully',
                'messages' => $messages,
                ],200);
                }
                
    public function myConversations (Request $request){
        $currentUser =$request->user();
        
        $conversations = Message::where('sender_id',$currentUser->id)
            ->orwhere('receiver_id',$currentUser->id)
            ->with('property:id,name')
            ->get()
            ->groupBy('property_id')
            ->map(function ($messages){
                return [
                    'property'=>$messages->first()->property,
                    'last_message'=>$messages->last()->message,
                    'last_message_at'=>$messages->last()->created_at,
                ];    

            })
            ->values();

            return response()->json([
                'message' => 'Conversations retrieved successfully',
                'data' => $conversations,
            ],200);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function markAsRead(Message $message)
    {
        $message->update(['read_at'=>now()]);
        return response()->json([
            'message' => 'message marked as readed successfully',
        ],200);
    }
}

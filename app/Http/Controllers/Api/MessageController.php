<?php

namespace App\Http\Controllers\Api;

use App\Models\message;
use Illuminate\Http\Request;
use App\Http\Resources\MessageResource;
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(message $message)
    {
        //
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
    public function destroy(message $message)
    {
        //
    }
}

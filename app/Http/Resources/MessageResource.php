<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       return [
        'id'=>$this->id,
        'property'=>[
            'id'=>$this->property->id,
            'name'=>$this->property->name,
            'location'=>$this->property->location,
            'price'=>$this->property->price,
            'agent'=>$this->property->agent,
        ],
        'sender_id'=>[
            'id'=>$this->sender->id,
            'name'=>$this->sender->name,
            'email'=>$this->sender->email,
            'phone'=>$this->sender->phone,
        ],
        'receiver_id'=>[
            'id'=>$this->receiver->id,
            'name'=>$this->receiver->name,
            'email'=>$this->receiver->email,
            'phone'=>$this->receiver->phone,
        ],
        'message'=>$this->message,
        'read_at'=>$this->read_at,
       ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'order_number'=>$this->order_number,
            'property'=>[
                'name'=>$this->property->name,
                'location'=>$this->property->location,
                'price'=>$this->property->price,
                'agent'=>$this->property->agent,
            ],
            'owner'=>$this->owner_id,
            'client'=>[
                'id'=>$this->user->id,
                'name'=>$this->user->name,
                'email'=>$this->user->email,
                'phone'=>$this->user->phone,
            ],
            'status'=>$this->status,
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at
        ];
    }
}

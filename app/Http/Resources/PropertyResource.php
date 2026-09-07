<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'features' => $this->features,
            'description' => $this->description,
            'location' => $this->location,
            'type' => $this->type,
            'contract_type' => $this->contract_type,
            'status' => $this->status,
            'images' => $this->images,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'agency' => $this->user->agency,
                'email' => $this->user->email,
                'phone' => $this->user->phone,
                'role' => $this->user->role,
                'avatar' => $this->user->avatar,
                'social_media' => $this->user->social_media,
                'location' => $this->user->location,
                'description' => $this->user->description,
                'type' => $this->user->type,
                'age' => $this->user->age,
            ],
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}

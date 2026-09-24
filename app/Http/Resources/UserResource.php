<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'whatsapp_phone' => $this->whatsapp_phone,
            'personal_website' => $this->personal_website,
            'role' => $this->role,
            'gender' => $this->gender,
            'avatar' => $this->avatar,
            'cover_photo' => $this->cover_photo,
            'social_media' => $this->social_media,
            'location' => $this->location,
            'description' => $this->description,
            'type' => $this->type,
            'age' => $this->age,
            'agency' => $this->agency,
            'properties' => PropertyResource::collection($this->properties),
        ];
    }
}

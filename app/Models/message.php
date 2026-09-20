<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class message extends Model
{
    protected $fillable = [
        'property_id',
        'sender_id',
        'receiver_id',
        'message',
        'read_at',
    ];

    public function casts(): array{
        return [
            'read_at' =>'datetime'
        ];
    }

    public function property(){
        return $this->belongsTo(Property::class);
    }

    public function sender(){
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver(){
        return $this->belongsTo(User::class, 'receiver_id');
    }
}

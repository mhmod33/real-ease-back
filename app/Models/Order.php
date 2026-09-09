<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Property;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Order extends Model
{
    protected $fillable=
    [
        'order_number',
        'property_id',
        'user_id',
        'owner_id',
        'status'
    ];

    public function Property():BelongsTo {
        return $this->belongsTo(Property::class);
    }

    public function User():BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function Owner():BelongsTo {
        return $this->belongsTo(User::class, 'owner_id');
    }
}

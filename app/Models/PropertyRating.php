<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PropertyRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'user_id',
        'rate',
        'comment',
    ];

    protected function casts(): array
    {
        return [
            'rate' => 'decimal:1',
        ];
    }

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

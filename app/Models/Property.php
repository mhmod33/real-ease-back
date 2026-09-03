<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Property extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'type',
        'contract_type',
        'location',
        'status',
        'image',
        'images',
        'user_id',
        'features'
    ];
    public function user() :BelongsTo{
        return $this->belongsTo(User::class);
    }
}

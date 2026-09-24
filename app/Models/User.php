<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'role',
        'type',
        'age',
        'gender',
        'agency',
        'location',
        'description',
        'avatar',
        'cover_photo',
        'social_media',
        'phone',
        'whatsapp_phone',
        'personal_website',
    ];

    public function properties() :HasMany{
        return $this->hasMany(Property::class);
    }

    public function propertyRatings(): HasMany
    {
        return $this->hasMany(PropertyRating::class);
    }

    public function agentRatings(): HasMany
    {
        return $this->hasMany(AgentRating::class, 'agent_id');
    }

    public function ratingsGiven(): HasMany
    {
        return $this->hasMany(AgentRating::class, 'user_id');
    }

    public function isAdmin() :bool {
        return $this->role==='admin';
    }
    public function isUser() :bool {
        return $this->role==='user';
    }
    public function isAgent() :bool {
        return $this->role==='agent';
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected function avatarUrl(): string
    {
        return $this->avatar? asset('storage/avatars/'.$this->avatar): asset('storage/avatars/default.png');
    }
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'social_media' => 'array',
        ];
    }
}

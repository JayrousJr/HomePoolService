<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles, SoftDeletes,HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'nationality',
        'city',
        'state',
        'street',
        'phone',
        'team_member',
        'role',
        'profile_photo_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

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
            'team_member' => 'boolean',
        ];
    }

    /**
     * Relationships
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function serviceAssignment()
    {
        return $this->hasMany(ServiceRequest::class, 'user_id');
    }

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public function requests()
    {
        return $this->hasMany(ServiceRequest::class, 'client_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'user_id');
    }

    /**
     * Role checking methods
     */
    public function isIT(): bool
    {
        return $this->hasRole('Administrator');
    }

    public function isTechnician(): bool
    {
        return $this->hasRole('Technician');
    }

    public function isManager(): bool
    {
        return $this->hasRole(['Manager', 'Administrator']);
    }
}
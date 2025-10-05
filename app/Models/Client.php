<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'client_category_id',
        'name',
        'email',
        'nationality',
        'city',
        'state',
        'street',
        'phone',
        'zip',
        'active',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    /**
     * Relationships
     */
    public function category()
    {
        return $this->belongsTo(ClientCategory::class, 'client_category_id');
    }

    public function requests()
    {
        return $this->hasMany(ServiceRequest::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes,HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'service_request_id',
        'user_id',
        'status',
        'comments',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => 'boolean',
        ];
    }

    /**
     * Relationships
     */
    public function serviceTask()
    {
        return $this->belongsTo(ServiceRequest::class, 'service_request_id');
    }

    public function userTask()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function assignedtasks()
    {
        return $this->hasMany(AssignedTask::class, 'task_id');
    }
}
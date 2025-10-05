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
        'scheduled_date',
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
            'scheduled_date' => 'date',
        ];
    }

    /**
     * Relationships
     */
    public function service_request()
    {
        return $this->belongsTo(ServiceRequest::class, 'service_request_id');
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function assignedTasks()
    {
        return $this->hasMany(AssignedTask::class, 'task_id');
    }

    // Legacy relationship names for backward compatibility
    public function serviceTask()
    {
        return $this->service_request();
    }

    public function userTask()
    {
        return $this->technician();
    }
}
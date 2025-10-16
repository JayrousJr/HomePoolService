<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmailBlast extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'subject',
        'message',
        'recipients',
        'recipients_count',
        'sent_at',
        'sent_by',
    ];

    protected $casts = [
        'recipients' => 'array',
        'sent_at' => 'datetime',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sent_by');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ToggleJob extends Model
{
    use HasUuids;
    protected $fillable = ["open"];
    protected $cast = [
        'open' => 'boolean'
    ];

}
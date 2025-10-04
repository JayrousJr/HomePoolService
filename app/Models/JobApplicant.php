<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobApplicant extends Model
{
    use HasFactory, SoftDeletes,HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'nationality',
        'city',
        'state',
        'street',
        'phone',
        'zip',
        'age',
        'birthdate',
        'socialsecurity',
        'socialsecurityNumber',
        'einNumber',
        'days',
        'starttime',
        'endtime',
        'startdate',
        'workperiod',
        'workHours',
        'smoke',
        'licence',
        'licenceNumber',
        'issueddate',
        'expiredate',
        'issuedcity',
        'transport',
        'hire',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'hire' => 'boolean',
            'days' => 'array',
        ];
    }
}
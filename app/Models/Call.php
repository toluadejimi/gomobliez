<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Call extends Model
{
    use HasFactory;
    protected $fillable = [
        'call_id',
        'user_id',
        'from_phone',
        'to_phone',
        'time_initiated',
        'call_time',
        'end_time',
        'status',
        'cost',
    ];
}

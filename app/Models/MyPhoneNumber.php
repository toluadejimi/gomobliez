<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyPhoneNumber extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'accountSid',
        'phone_no',
        'sid',
        'amount',
        'status'
    ];
}

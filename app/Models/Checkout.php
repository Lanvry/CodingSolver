<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'package_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'company',
        'address',
        'notes',
        'payment_method',
        'status'
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}

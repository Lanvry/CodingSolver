<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;
     protected $fillable = [
        'name',
        'price',
        'features',
        'category',
        'is_recommended',
        'badge',
        'tagline',
        'revisions',
        'support_duration',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'is_recommended' => 'boolean',
        'is_active' => 'boolean',
    ];
}

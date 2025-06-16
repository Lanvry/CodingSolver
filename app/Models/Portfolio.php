<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Portfolio extends Model
{
    use HasFactory;

     protected $fillable = [
        'title',
        'slug',
        'thumbnail',
        'category',
        'description',
        'project_link',
    ];

    // Optional: Generate slug automatically
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($portfolio) {
            $portfolio->slug = Str::slug($portfolio->title);
        });
    }
}

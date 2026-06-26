<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id', 'title', 'url', 'status',
        'client_name', 'client_contact', 'progress', 'income',
        'requirements', 'report', 'deadline',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

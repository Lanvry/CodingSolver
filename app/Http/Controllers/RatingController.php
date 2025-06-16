<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'company' => 'required|string|max:100',
            'feedback' => 'nullable|string|max:500',
            'nama' => 'required|string|max:100',
        ]);

        // Simpan ke database jika sudah punya model Rating
        Rating::create([
            'rating' => $request->rating,
            'company' => $request->company, 
            'feedback' => $request->feedback,
            'nama' => $request->nama,
        ]);

        return redirect()->route('index')->with('success', 'Terima kasih atas penilaian Anda!');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Portfolio;
use App\Models\Rating;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $companyPackages = Package::where('category', 'company')->where('is_active', true)->get();
        $studentPackages = Package::where('category', 'student')->where('is_active', true)->get();
        $portfolios = Portfolio::all()->sortByDesc('created_at')->take(6);
        $ratings = Rating::all()->sortByDesc('created_at')->take(3);
        return view('index', compact('companyPackages', 'studentPackages', 'portfolios', 'ratings'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonial;
use App\Models\Task;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::where('is_approved', true)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($testimonials);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $testimonial = Testimonial::create([
            'name' => $request->name,
            'role' => $request->role,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'is_approved' => true // Auto-approved for demonstration purposes
        ]);

        return response()->json($testimonial, 201);
    }

    public function getStats()
    {
        $completedTasksCount = Task::where('status', 'done')->count();
        $projectsDelivered = $completedTasksCount;

        $avgRating = Testimonial::where('is_approved', true)->avg('rating');
        if ($avgRating) {
            $satisfaction = round(($avgRating / 5) * 100);
        } else {
            $satisfaction = 98; // Fallback matching original layout
        }

        return response()->json([
            'projects_delivered' => $projectsDelivered . '+',
            'client_satisfaction' => $satisfaction . '%',
            'years_experience' => '3+'
        ]);
    }
}

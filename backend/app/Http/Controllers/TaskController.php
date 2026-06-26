<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::where('user_id', $request->user->id)->orderBy('created_at', 'desc')->get();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'url' => 'nullable|url',
            'client_name' => 'nullable|string|max:255',
            'client_contact' => 'nullable|string|max:255',
            'progress' => 'nullable|string|max:50',
            'income' => 'nullable|numeric|min:0',
            'requirements' => 'nullable|string',
            'report' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);

        $task = Task::create([
            'user_id' => $request->user->id,
            'title' => $request->title,
            'url' => $request->url,
            'client_name' => $request->client_name,
            'client_contact' => $request->client_contact,
            'progress' => $request->progress ?? 'planning',
            'income' => $request->income ?? 0,
            'requirements' => $request->requirements,
            'report' => $request->report,
            'deadline' => $request->deadline,
            'status' => 'pending'
        ]);

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'status' => 'nullable|in:pending,done',
            'title' => 'nullable|string|max:255',
            'url' => 'nullable|url',
            'client_name' => 'nullable|string|max:255',
            'client_contact' => 'nullable|string|max:255',
            'progress' => 'nullable|string|max:50',
            'income' => 'nullable|numeric|min:0',
            'requirements' => 'nullable|string',
            'report' => 'nullable|string',
            'deadline' => 'nullable|date',
        ]);

        $task = Task::where('user_id', $request->user->id)->find($id);

        if (!$task) {
            return response()->json(['error' => 'Not found'], 404);
        }

        if ($request->has('status')) $task->status = $request->status;
        if ($request->has('title')) $task->title = $request->title;
        if ($request->has('url')) $task->url = $request->url;
        if ($request->has('client_name')) $task->client_name = $request->client_name;
        if ($request->has('client_contact')) $task->client_contact = $request->client_contact;
        if ($request->has('progress')) $task->progress = $request->progress;
        if ($request->has('income')) $task->income = $request->income;
        if ($request->has('requirements')) $task->requirements = $request->requirements;
        if ($request->has('report')) $task->report = $request->report;
        if ($request->has('deadline')) $task->deadline = $request->deadline;

        $task->save();

        return response()->json($task);
    }

    public function destroy(Request $request, $id)
    {
        $task = Task::where('user_id', $request->user->id)->find($id);
        
        if ($task) {
            $task->delete();
        }
        
        return response()->json(['message' => 'Deleted successfully']);
    }
}

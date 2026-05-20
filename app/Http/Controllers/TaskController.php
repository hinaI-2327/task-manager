<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // GET /api/tasks
    public function apiIndex()
    {
        return Task::all();
    }

    // POST /api/tasks
    public function apiStore(Request $request)
    {
        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    // PUT /api/tasks/{task}
    public function apiUpdate(Request $request, Task $task)
    {
        $task->update($request->all());
        return response()->json($task);
    }

    // DELETE /api/tasks/{task}
    public function apiDestroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}

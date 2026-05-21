<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // テーブルの中身を全選択
    public function apiIndex()
    {
        return Task::all();
    }

    // 新規作成タスクを作る
    public function apiStore(Request $request)
    {
        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    // 編集して更新
    public function apiUpdate(Request $request, Task $task)
    {
        $task->update($request->all());
        return response()->json($task);
    }

    // 削除
    public function apiDestroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }

    // 保存したデータを取り出して表示
    public function apiShow(Task $task)
    {
        return response()->json($task);
    }

}

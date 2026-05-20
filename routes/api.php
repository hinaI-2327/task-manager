<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/tasks', [TaskController::class, 'apiIndex']);
Route::post('/tasks', [TaskController::class, 'apiStore']);
Route::put('/tasks/{task}', [TaskController::class, 'apiUpdate']);
Route::delete('/tasks/{task}', [TaskController::class, 'apiDestroy']);
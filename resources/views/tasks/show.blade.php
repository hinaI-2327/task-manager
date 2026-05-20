@extends('layouts.app')

@section('title', 'タスク詳細')

@section('content')
<div class="container">
  <h1>{{ $task->title }}</h1>

  <div class="card mt-3">
    <div class="card-body">
      <h5 class="card-title">説明</h5>
      <p class="card-text">{{ $task->description }}</p>
    </div>
  </div>

  <a href="{{ route('tasks.index') }}" class="btn btn-secondary mt-3">一覧に戻る</a>
</div>
@endsection

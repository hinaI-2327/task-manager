<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            // React から送られてくる項目
            $table->string('title');
            $table->date('due_date');
            $table->text('content')->nullable();

            // 時間系（必要なら追加）
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            // Laravel 標準の created_at / updated_at
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};

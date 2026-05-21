<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::table('tasks', function (Blueprint $table) {
        $table->string('priority')->default('medium');
        $table->string('status')->default('not_started');
        $table->string('category')->nullable();
        $table->text('memo')->nullable();
    });
}

public function down(): void
{
    Schema::table('tasks', function (Blueprint $table) {
        $table->dropColumn(['priority', 'status', 'category', 'memo']);
    });
}

};

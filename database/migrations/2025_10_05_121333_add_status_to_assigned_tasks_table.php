<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('assigned_tasks', function (Blueprint $table) {
            // Add status field for tracking task progress
            $table->string('status')->default('pending')->after('task_id');

            // Add started_at and completed_at timestamps
            $table->timestamp('started_at')->nullable()->after('status');
            $table->timestamp('completed_at')->nullable()->after('started_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assigned_tasks', function (Blueprint $table) {
            $table->dropColumn(['status', 'started_at', 'completed_at']);
        });
    }
};

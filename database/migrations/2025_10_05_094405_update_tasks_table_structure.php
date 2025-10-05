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
        Schema::table('tasks', function (Blueprint $table) {
            // Change status from boolean to string enum
            $table->string('status')->default('pending')->change();

            // Add scheduled_date field
            $table->date('scheduled_date')->nullable()->after('status');

            // Make comments nullable and remove default
            $table->text('comments')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            // Revert status to boolean
            $table->boolean('status')->default(0)->change();

            // Remove scheduled_date field
            $table->dropColumn('scheduled_date');

            // Restore comments default
            $table->string('comments')->default('Not Performed')->change();
        });
    }
};

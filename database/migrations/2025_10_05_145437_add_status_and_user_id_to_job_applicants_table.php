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
        Schema::table('job_applicants', function (Blueprint $table) {
            $table->enum('status', ['pending', 'accepted', 'rejected', 'hired'])->default('pending')->after('hire');
            $table->foreignUuid('user_id')->nullable()->after('status')->constrained('users')->onDelete('set null');
            $table->timestamp('accepted_at')->nullable()->after('user_id');
            $table->timestamp('rejected_at')->nullable()->after('accepted_at');
            $table->timestamp('hired_at')->nullable()->after('rejected_at');
            $table->text('rejection_reason')->nullable()->after('hired_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_applicants', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn(['status', 'user_id', 'accepted_at', 'rejected_at', 'hired_at', 'rejection_reason']);
        });
    }
};

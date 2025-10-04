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
        Schema::table('users', function (Blueprint $table) {
            $table->string('nationality')->nullable()->index()->after('email');
            $table->string('city')->nullable()->index()->after('nationality');
            $table->string('state')->nullable()->index()->after('city');
            $table->string('street')->nullable()->index()->after('state');
            $table->string('phone')->nullable()->index()->after('street');
            $table->boolean('team_member')->default(0)->after('phone');
            $table->string('role')->default('User')->after('team_member');
            $table->string('profile_photo_path')->nullable()->after('role');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'nationality',
                'city',
                'state',
                'street',
                'phone',
                'team_member',
                'role',
                'profile_photo_path'
            ]);
            $table->dropSoftDeletes();
        });
    }
};

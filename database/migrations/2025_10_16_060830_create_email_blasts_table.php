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
        Schema::create('email_blasts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('subject');
            $table->longText('message');
            $table->json('recipients'); // Store array of email addresses
            $table->integer('recipients_count')->default(0);
            $table->timestamp('sent_at')->nullable();
            $table->foreignUuid('sent_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_blasts');
    }
};

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
        Schema::create('job_applicants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->index();
            $table->string('email')->unique();
            $table->string('nationality')->index();
            $table->string('city')->index();
            $table->string('state')->index();
            $table->string('street')->index();
            $table->string('phone')->index();
            $table->string('zip')->index()->nullable();
            $table->string('age')->index()->nullable();
            $table->string('birthdate')->index()->nullable();
            $table->string('socialsecurity')->index()->nullable();
            $table->string('socialsecurityNumber')->index()->nullable()->default('NULL');
            $table->string('einNumber')->index()->nullable()->default('NULL');
            $table->string('days')->index()->nullable();
            $table->string('starttime')->index()->nullable();
            $table->string('endtime')->index()->nullable();
            $table->string('startdate')->index()->nullable();
            $table->string('workperiod')->index()->nullable();
            $table->string('workHours')->index()->nullable();
            $table->string('smoke')->index()->nullable();
            $table->string('licence')->index()->nullable();
            $table->string('licenceNumber')->index()->nullable()->default('NULL');
            $table->string('issueddate')->index()->nullable()->default('NULL');
            $table->string('expiredate')->index()->nullable()->default('NULL');
            $table->string('issuedcity')->index()->nullable()->default('NULL');
            $table->string('transport')->index()->nullable();
            $table->boolean('hire')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applicants');
    }
};

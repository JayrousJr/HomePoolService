<?php

use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\ServiceRequestController;
use App\Http\Controllers\Public\MessageController;
use App\Http\Controllers\Public\PagesController;
use App\Http\Controllers\User\JobApplicationController;
use App\Http\Controllers\User\UserDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Public Routes
 */
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/service', [PagesController::class, 'service'])->name('service');
Route::get('/gallery', [PagesController::class, 'gallery'])->name('gallery');
Route::get('/about', [PagesController::class, 'about'])->name('about');
Route::get('/category', [PagesController::class, 'categories'])->name('category');
Route::get('/contact', [PagesController::class, 'contact'])->name('contact');

// Service Request Form
Route::get('/service-request', [PagesController::class, 'askservice'])->name('service-request.form');
Route::post('/request', [ServiceRequestController::class, 'store'])->name('request.store');

// Contact Message
Route::post('/send', [MessageController::class, 'store'])->name('message.send');

/**
 * User Authenticated Routes
 */
Route::middleware(['auth', 'verified'])->group(function () {
    // User Dashboard
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');

    // Job Application
    Route::get('/apply', [JobApplicationController::class, 'create'])->name('apply');
    Route::post('/apply_job', [JobApplicationController::class, 'store'])->name('apply_job.store');

    // User's Messages
    Route::get('/messages', [UserDashboardController::class, 'messages'])->name('user.messages.index');
    Route::get('/messages/{message}', [UserDashboardController::class, 'showMessage'])->name('user.messages.show');

    // User's Service Requests
    Route::get('/myservices', [UserDashboardController::class, 'services'])->name('user.services.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
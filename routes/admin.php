<?php

use App\Http\Controllers\Admin\ClientCategoryController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ServiceRequestController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\AssignedTaskController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\JobApplicantController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\PopUpController;
use App\Http\Controllers\Admin\CompanyInfoController;
use App\Http\Controllers\Admin\SocialNetworkController;
use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\VisitorController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PdfController;
use Illuminate\Support\Facades\Route;

/**
 * Admin Routes
 * Prefix: /admin
 * Middleware: auth, verified, role:Administrator|Manager|Technician
 */

Route::middleware(['auth', 'verified', 'role:Administrator,Manager,Technician'])->group(function () {

    // Admin Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Client Categories
    Route::resource('client-categories', ClientCategoryController::class)->names([
        'index' => 'admin.client-categories.index',
        'create' => 'admin.client-categories.create',
        'store' => 'admin.client-categories.store',
        'show' => 'admin.client-categories.show',
        'edit' => 'admin.client-categories.edit',
        'update' => 'admin.client-categories.update',
        'destroy' => 'admin.client-categories.destroy',
    ]);

    // Clients
    Route::resource('clients', ClientController::class)->names([
        'index' => 'admin.clients.index',
        'create' => 'admin.clients.create',
        'store' => 'admin.clients.store',
        'show' => 'admin.clients.show',
        'edit' => 'admin.clients.edit',
        'update' => 'admin.clients.update',
        'destroy' => 'admin.clients.destroy',
    ]);

    // Service Requests
    Route::resource('service-requests', ServiceRequestController::class)->names([
        'index' => 'admin.service-requests.index',
        'create' => 'admin.service-requests.create',
        'store' => 'admin.service-requests.store',
        'show' => 'admin.service-requests.show',
        'edit' => 'admin.service-requests.edit',
        'update' => 'admin.service-requests.update',
        'destroy' => 'admin.service-requests.destroy',
    ]);

    // Tasks
    Route::resource('tasks', TaskController::class)->names([
        'index' => 'admin.tasks.index',
        'create' => 'admin.tasks.create',
        'store' => 'admin.tasks.store',
        'show' => 'admin.tasks.show',
        'edit' => 'admin.tasks.edit',
        'update' => 'admin.tasks.update',
        'destroy' => 'admin.tasks.destroy',
    ]);

    // Assigned Tasks (Technician task completion)
    Route::resource('assigned-tasks', AssignedTaskController::class)->names([
        'index' => 'admin.assigned-tasks.index',
        'create' => 'admin.assigned-tasks.create',
        'store' => 'admin.assigned-tasks.store',
        'show' => 'admin.assigned-tasks.show',
        'edit' => 'admin.assigned-tasks.edit',
        'update' => 'admin.assigned-tasks.update',
        'destroy' => 'admin.assigned-tasks.destroy',
    ]);

    // Messages
    Route::resource('messages', MessageController::class)->names([
        'index' => 'admin.messages.index',
        'create' => 'admin.messages.create',
        'store' => 'admin.messages.store',
        'show' => 'admin.messages.show',
        'edit' => 'admin.messages.edit',
        'update' => 'admin.messages.update',
        'destroy' => 'admin.messages.destroy',
    ]);
    Route::post('/messages/{message}/reply', [MessageController::class, 'reply'])->name('admin.messages.reply');

    // Job Applicants
    Route::resource('job-applicants', JobApplicantController::class)->names([
        'index' => 'admin.job-applicants.index',
        'create' => 'admin.job-applicants.create',
        'store' => 'admin.job-applicants.store',
        'show' => 'admin.job-applicants.show',
        'edit' => 'admin.job-applicants.edit',
        'update' => 'admin.job-applicants.update',
        'destroy' => 'admin.job-applicants.destroy',
    ]);

    // Gallery
    Route::resource('gallery', GalleryController::class)->names([
        'index' => 'admin.gallery.index',
        'create' => 'admin.gallery.create',
        'store' => 'admin.gallery.store',
        'show' => 'admin.gallery.show',
        'edit' => 'admin.gallery.edit',
        'update' => 'admin.gallery.update',
        'destroy' => 'admin.gallery.destroy',
    ]);

    // Pop-ups
    Route::resource('popups', PopUpController::class)->names([
        'index' => 'admin.popups.index',
        'create' => 'admin.popups.create',
        'store' => 'admin.popups.store',
        'show' => 'admin.popups.show',
        'edit' => 'admin.popups.edit',
        'update' => 'admin.popups.update',
        'destroy' => 'admin.popups.destroy',
    ]);

    // Company Info
    Route::resource('company-info', CompanyInfoController::class)->names([
        'index' => 'admin.company-info.index',
        'create' => 'admin.company-info.create',
        'store' => 'admin.company-info.store',
        'show' => 'admin.company-info.show',
        'edit' => 'admin.company-info.edit',
        'update' => 'admin.company-info.update',
        'destroy' => 'admin.company-info.destroy',
    ]);

    // Social Networks
    Route::resource('social-networks', SocialNetworkController::class)->names([
        'index' => 'admin.social-networks.index',
        'create' => 'admin.social-networks.create',
        'store' => 'admin.social-networks.store',
        'show' => 'admin.social-networks.show',
        'edit' => 'admin.social-networks.edit',
        'update' => 'admin.social-networks.update',
        'destroy' => 'admin.social-networks.destroy',
    ]);

    // About
    Route::resource('about', AboutController::class)->names([
        'index' => 'admin.about.index',
        'create' => 'admin.about.create',
        'store' => 'admin.about.store',
        'show' => 'admin.about.show',
        'edit' => 'admin.about.edit',
        'update' => 'admin.about.update',
        'destroy' => 'admin.about.destroy',
    ]);

    // Visitors
    Route::get('/visitors', [VisitorController::class, 'index'])->name('admin.visitors.index');

    // PDF Generation
    Route::get('/pdf/client/{client}', [PdfController::class, 'client'])->name('admin.pdf.client');
    Route::get('/pdf/service-request/{serviceRequest}', [PdfController::class, 'serviceRequest'])->name('admin.pdf.service-request');
});

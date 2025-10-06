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
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ToggleJobController;
use Illuminate\Support\Facades\Route;

/**
 * Admin Routes
 * Prefix: /admin
 * Middleware: auth, verified, role:Administrator|Manager|Technician
 */

// Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

Route::middleware(['auth', 'verified', 'role:Administrator,Manager,Technician', \App\Http\Middleware\CheckUserActive::class])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
  
    Route::prefix('admin')->group(function () {

        Route::put('toggle/{toggleJob}', [ToggleJobController::class, "update"])->name("job.toggle");
        // Assigned Tasks (accessible to all admin roles - technicians can update their tasks)
        Route::resource('assigned-tasks', AssignedTaskController::class)->names([
            'index' => 'admin.assigned-tasks.index',
            'create' => 'admin.assigned-tasks.create',
            'store' => 'admin.assigned-tasks.store',
            'show' => 'admin.assigned-tasks.show',
            'edit' => 'admin.assigned-tasks.edit',
            'update' => 'admin.assigned-tasks.update',
            'destroy' => 'admin.assigned-tasks.destroy',
        ]);

        // Manager-only routes
        Route::middleware(['role:Administrator,Manager'])->group(function () {
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

            // Job Applicant Actions
            Route::post('/job-applicants/{jobApplicant}/accept', [JobApplicantController::class, 'accept'])->name('admin.job-applicants.accept');
            Route::post('/job-applicants/{jobApplicant}/reject', [JobApplicantController::class, 'reject'])->name('admin.job-applicants.reject');
            Route::post('/job-applicants/{jobApplicant}/hire', [JobApplicantController::class, 'hire'])->name('admin.job-applicants.hire');
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

            // Visitors
            Route::get('/visitors', [VisitorController::class, 'index'])->name('admin.visitors.index');

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
            // Admin Dashboard (accessible to all admin roles)
            // User Management
            Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
            Route::get('/users/{user}', [UserController::class, 'show'])->name('admin.users.show');
            Route::post('/users/{user}/activate', [UserController::class, 'activate'])->name('admin.users.activate');
            Route::post('/users/{user}/deactivate', [UserController::class, 'deactivate'])->name('admin.users.deactivate');
            Route::post('/users/{user}/end-contract', [UserController::class, 'endContract'])->name('admin.users.end-contract');
            Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');

          
        });

        // PDF Generation
        Route::get('/pdf/client/{client}', [PdfController::class, 'client'])->name('admin.pdf.client');
        Route::get('/pdf/service-request/{serviceRequest}', [PdfController::class, 'serviceRequest'])->name('admin.pdf.service-request');
    });
});
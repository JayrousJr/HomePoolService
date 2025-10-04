<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Message;
use App\Models\ServiceRequest;
use App\Models\Task;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with statistics.
     */
    public function index(): Response
    {
        $stats = [
            'total_users' => User::count(),
            'total_clients' => Client::count(),
            'total_service_requests' => ServiceRequest::count(),
            'total_tasks' => Task::count(),
            'total_messages' => Message::count(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AssignedTask;
use App\Models\Client;
use App\Models\Message;
use App\Models\ServiceRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with statistics.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $isTechnician = $user->roles->contains(function ($role) {
            return $role->name === 'Technician';
        });

        if ($isTechnician) {
            // Technician dashboard - show only their assigned tasks
            $assignedTasks = AssignedTask::with(['task.service_request', 'task.technician'])
                ->whereHas('task', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->get();

            $stats = [
                'total_assigned_tasks' => $assignedTasks->count(),
                'pending_tasks' => $assignedTasks->where('status', 'pending')->count(),
                'in_progress_tasks' => $assignedTasks->where('status', 'in_progress')->count(),
                'completed_tasks' => $assignedTasks->where('status', 'completed')->count(),
            ];

            return Inertia::render('admin/dashboard', [
                'stats' => $stats,
                'is_technician' => true,
                'recent_tasks' => $assignedTasks->take(5),
            ]);
        }

        // Manager/Admin dashboard - show all stats
        $stats = [
            'total_users' => User::count(),
            'total_clients' => Client::count(),
            'total_service_requests' => ServiceRequest::count(),
            'total_tasks' => Task::count(),
            'total_messages' => Message::count(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'is_technician' => false,
        ]);
    }
}
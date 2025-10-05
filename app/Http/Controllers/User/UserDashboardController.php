<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\AssignedTask;
use App\Models\Message;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserDashboardController extends Controller
{
    /**
     * Display user dashboard with stats.
     */
    public function index(): Response
    {
        $user = Auth::user();

        // Check if user is a technician
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

            return Inertia::render('dashboard', [
                'stats' => $stats,
                'is_technician' => true,
                'recent_tasks' => $assignedTasks->take(5),
            ]);
        }

        // Regular user dashboard
        $stats = [
            'messagesCount' => Message::where('email', $user->email)->count(),
            'serviceRequestsCount' => ServiceRequest::where('email', $user->email)->count(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'is_technician' => false,
        ]);
    }

    /**
     * List current user's messages (paginated).
     */
    public function messages(): Response
    {
        $user = Auth::user();

        $messages = Message::where('email', $user->email)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('user/messages', [
            'messages' => $messages,
        ]);
    }

    /**
     * Show single message (verify ownership).
     */
    public function showMessage(Message $message): Response
    {
        $user = Auth::user();

        // Verify ownership
        if ($message->email !== $user->email) {
            abort(403, 'Unauthorized access to this message.');
        }

        return Inertia::render('user/messageshow', [
            'message' => $message,
        ]);
    }

    /**
     * List current user's service requests (paginated).
     */
    public function services(): Response
    {
        $user = Auth::user();

        $services = ServiceRequest::where('email', $user->email)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('user/services', [
            'services' => $services,
        ]);
    }
}
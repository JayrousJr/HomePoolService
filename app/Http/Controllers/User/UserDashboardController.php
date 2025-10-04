<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
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

        $stats = [
            'messagesCount' => Message::where('email', $user->email)->count(),
            'serviceRequestsCount' => ServiceRequest::where('email', $user->email)->count(),
        ];

        return Inertia::render('user/dashboard', [
            'stats' => $stats,
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
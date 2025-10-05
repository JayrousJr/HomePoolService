<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\TechnicianActivated;
use App\Mail\TechnicianContractEnded;
use App\Mail\TechnicianDeactivated;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of users (technicians and managers only).
     */
    public function index(Request $request): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $users = User::with('roles')
            ->whereHas('roles', function ($query) {
                // Exclude administrators from the list
                $query->whereIn('name', ['Manager', 'Technician']);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Display the specified user.
     */
    public function show(Request $request, User $user): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        // Prevent viewing administrators
        if ($user->isIT()) {
            abort(403, 'Cannot view administrator users.');
        }

        $user->load('roles');

        return Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Activate a user account.
     */
    public function activate(Request $request, User $user): RedirectResponse
    {
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        // Prevent activating administrators
        if ($user->isIT()) {
            abort(403, 'Cannot modify administrator users.');
        }

        if ($user->active) {
            return redirect()->back()
                ->with('error', 'This user is already active.');
        }

        try {
            $user->update(['active' => true]);

            // Send activation email
            Mail::to($user->email)->send(new TechnicianActivated($user));

            return redirect()->back()
                ->with('success', 'User activated successfully and notification email sent.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to activate user: ' . $e->getMessage());
        }
    }

    /**
     * Deactivate a user account (suspend).
     */
    public function deactivate(Request $request, User $user): RedirectResponse
    {

        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        // Prevent deactivating administrators
        if ($user->isIT()) {
            abort(403, 'Cannot modify administrator users.');
        }

        // Prevent deactivating yourself
        if ( $user->isManager()) {
            return redirect()->back()
                ->with('error', 'You cannot deactivate your own account.');
        }

        if (!$user->active) {
            return redirect()->back()
                ->with('error', 'This user is already inactive.');
        }

        try {
            $user->update(['active' => false]);
            // Send deactivation email

            Mail::to($user->email)->send(new TechnicianDeactivated($user));

            return redirect()->back()
                ->with('success', 'User deactivated successfully and notification email sent.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to deactivate user: ' . $e->getMessage());
        }
    }

    /**
     * End contract (permanently deactivate).
     */
    public function endContract(Request $request, User $user): RedirectResponse
    {
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        // Prevent ending contract for administrators
        if ($user->isIT()) {
            abort(403, 'Cannot modify administrator users.');
        }

        // Prevent ending your own contract
        if ($user->isManager()) {
            return redirect()->back()
                ->with('error', 'You cannot end your own contract.');
        }

        try {
            $user->update(['active' => false]);

            // Send contract termination email
            Mail::to($user->email)->send(new TechnicianContractEnded($user));

            return redirect()->back()
                ->with('success', 'Contract ended successfully and notification email sent.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to end contract: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified user from storage (soft delete).
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        // Prevent deleting administrators
        if ($user->isIT()) {
            abort(403, 'Cannot delete administrator users.');
        }

        // Prevent deleting yourself
        if ($user->id === $request->user()->id) {
            return redirect()->back()
                ->with('error', 'You cannot delete your own account.');
        }

        try {
            $user->delete();

            return redirect()->route('admin.users.index')
                ->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete user: ' . $e->getMessage());
        }
    }
}
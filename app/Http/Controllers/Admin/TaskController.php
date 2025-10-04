<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     * Managers see all tasks, technicians see only their tasks.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Build query based on user role
        $query = Task::with(['serviceTask', 'userTask']);

        if ($user->isManager()) {
            // Managers see all tasks
            $tasks = $query->latest()->paginate(10)->withQueryString();
        } else {
            // Technicians see only their tasks
            $tasks = $query->where('user_id', $user->id)
                ->latest()
                ->paginate(10)
                ->withQueryString();
        }

        return Inertia::render('admin/tasks/index', [
            'tasks' => $tasks,
            'is_manager' => $user->isManager(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        $user = $request->user();

        // Only managers can create tasks
        if (!$user->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        // Get unassigned service requests (exclude those that already have tasks)
        $unassignedRequests = ServiceRequest::leftJoin('tasks', 'service_requests.id', '=', 'tasks.service_request_id')
            ->whereNull('tasks.id')
            ->select('service_requests.*')
            ->orderBy('service_requests.created_at', 'desc')
            ->get();

        // Get technicians (users with Technician role)
        $technicians = User::whereHas('roles', function ($query) {
            $query->where('name', 'Technician');
        })->orderBy('name')->get();

        return Inertia::render('admin/tasks/create', [
            'unassigned_requests' => $unassignedRequests,
            'technicians' => $technicians,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Only managers can create tasks
        if (!$user->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'service_request_id' => 'required|exists:service_requests,id',
            'user_id' => 'required|exists:users,id',
            'comments' => 'nullable|string|max:255',
        ]);

        try {
            DB::beginTransaction();

            // Create task with default values
            $task = Task::create([
                'service_request_id' => $validated['service_request_id'],
                'user_id' => $validated['user_id'],
                'status' => false,
                'comments' => $validated['comments'] ?? 'Not Performed',
            ]);

            // Mark the service request as assigned
            ServiceRequest::where('id', $validated['service_request_id'])
                ->update(['assigned' => true]);

            DB::commit();

            return redirect()->route('admin.tasks.index')
                ->with('success', 'Task created and assigned successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create task: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Task $task): Response
    {
        $user = $request->user();

        // Technicians can only view their own tasks
        if (!$user->isManager() && $task->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $task->load(['serviceTask', 'userTask', 'assignedtasks']);

        return Inertia::render('admin/tasks/show', [
            'task' => $task,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Task $task): Response
    {
        $user = $request->user();

        // Only managers can edit tasks
        if (!$user->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        // Get all service requests for the dropdown
        $serviceRequests = ServiceRequest::orderBy('created_at', 'desc')->get();

        // Get technicians
        $technicians = User::whereHas('roles', function ($query) {
            $query->where('name', 'Technician');
        })->orderBy('name')->get();

        return Inertia::render('admin/tasks/edit', [
            'task' => $task,
            'service_requests' => $serviceRequests,
            'technicians' => $technicians,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task): RedirectResponse
    {
        $user = $request->user();

        // Only managers can update tasks
        if (!$user->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'service_request_id' => 'required|exists:service_requests,id',
            'user_id' => 'required|exists:users,id',
            'status' => 'boolean',
            'comments' => 'nullable|string|max:255',
        ]);

        try {
            $task->update($validated);

            return redirect()->route('admin.tasks.index')
                ->with('success', 'Task updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update task: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Request $request, Task $task): RedirectResponse
    {
        $user = $request->user();

        // Only managers can delete tasks
        if (!$user->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        try {
            DB::beginTransaction();

            // Mark service request as unassigned
            ServiceRequest::where('id', $task->service_request_id)
                ->update(['assigned' => false]);

            // Delete the task
            $task->delete();

            DB::commit();

            return redirect()->route('admin.tasks.index')
                ->with('success', 'Task deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()
                ->with('error', 'Failed to delete task: ' . $e->getMessage());
        }
    }
}

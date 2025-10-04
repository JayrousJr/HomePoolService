<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AssignedTask;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AssignedTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     * Technicians see only their assigned tasks.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Build query - show assigned tasks with task relationship
        $query = AssignedTask::with(['taskAssigned.serviceTask', 'taskAssigned.userTask']);

        if (!$user->isManager()) {
            // Technicians see only tasks assigned to them
            $query->whereHas('taskAssigned', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        }

        $assignedTasks = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/assigned-tasks/index', [
            'assigned_tasks' => $assignedTasks,
            'is_manager' => $user->isManager(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Only show tasks assigned to current user (for technicians).
     */
    public function create(Request $request): Response
    {
        $user = $request->user();

        // Get tasks that are:
        // 1. Assigned to current user (for technicians)
        // 2. Not yet completed (don't have an assigned_task record)
        $query = Task::with('serviceTask')
            ->whereDoesntHave('assignedtasks');

        if (!$user->isManager()) {
            // Technicians only see their own tasks
            $query->where('user_id', $user->id);
        }

        $availableTasks = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('admin/assigned-tasks/create', [
            'available_tasks' => $availableTasks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * Validate feedback, image_before, image_after are required.
     * Mark task status as complete.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'feedback' => 'required|string|max:5000',
            'image_before' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_after' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            DB::beginTransaction();

            // Check if task is already completed
            $taskAlreadyCompleted = AssignedTask::where('task_id', $validated['task_id'])->exists();
            if ($taskAlreadyCompleted) {
                return redirect()->back()
                    ->withInput()
                    ->with('error', 'This task has already been completed.');
            }

            // Verify user has access to this task (for technicians)
            $task = Task::findOrFail($validated['task_id']);
            $user = $request->user();

            if (!$user->isManager() && $task->user_id !== $user->id) {
                abort(403, 'Unauthorized action.');
            }

            // Handle image uploads
            $imageBeforePath = null;
            $imageAfterPath = null;

            if ($request->hasFile('image_before')) {
                $imageBeforePath = $request->file('image_before')->store('image_before', 'public');
            }

            if ($request->hasFile('image_after')) {
                $imageAfterPath = $request->file('image_after')->store('image_after', 'public');
            }

            // Create assigned task
            $assignedTask = AssignedTask::create([
                'task_id' => $validated['task_id'],
                'feedback' => $validated['feedback'],
                'image_before' => $imageBeforePath,
                'image_after' => $imageAfterPath,
            ]);

            // Mark the task as complete
            $task->update([
                'status' => true,
                'comments' => 'Completed',
            ]);

            DB::commit();

            return redirect()->route('admin.assigned-tasks.index')
                ->with('success', 'Task completed successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            // Clean up uploaded files if transaction fails
            if (isset($imageBeforePath)) {
                Storage::disk('public')->delete($imageBeforePath);
            }
            if (isset($imageAfterPath)) {
                Storage::disk('public')->delete($imageAfterPath);
            }

            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to complete task: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, AssignedTask $assignedTask): Response
    {
        $user = $request->user();

        // Load task relationship
        $assignedTask->load(['taskAssigned.serviceTask', 'taskAssigned.userTask']);

        // Technicians can only view their own assigned tasks
        if (!$user->isManager() && $assignedTask->taskAssigned->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('admin/assigned-tasks/show', [
            'assigned_task' => $assignedTask,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, AssignedTask $assignedTask): Response
    {
        $user = $request->user();

        // Load task relationship
        $assignedTask->load(['taskAssigned.serviceTask', 'taskAssigned.userTask']);

        // Technicians can only edit their own assigned tasks
        if (!$user->isManager() && $assignedTask->taskAssigned->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('admin/assigned-tasks/edit', [
            'assigned_task' => $assignedTask,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AssignedTask $assignedTask): RedirectResponse
    {
        $user = $request->user();

        // Technicians can only update their own assigned tasks
        if (!$user->isManager() && $assignedTask->taskAssigned->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'feedback' => 'required|string|max:5000',
            'image_before' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_after' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            DB::beginTransaction();

            $updateData = [
                'feedback' => $validated['feedback'],
            ];

            // Handle image_before upload
            if ($request->hasFile('image_before')) {
                // Delete old image
                if ($assignedTask->image_before) {
                    Storage::disk('public')->delete($assignedTask->image_before);
                }
                $updateData['image_before'] = $request->file('image_before')->store('image_before', 'public');
            }

            // Handle image_after upload
            if ($request->hasFile('image_after')) {
                // Delete old image
                if ($assignedTask->image_after) {
                    Storage::disk('public')->delete($assignedTask->image_after);
                }
                $updateData['image_after'] = $request->file('image_after')->store('image_after', 'public');
            }

            $assignedTask->update($updateData);

            DB::commit();

            return redirect()->route('admin.assigned-tasks.index')
                ->with('success', 'Assigned task updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update assigned task: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Request $request, AssignedTask $assignedTask): RedirectResponse
    {
        $user = $request->user();

        // Only managers can delete assigned tasks
        if (!$user->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        try {
            DB::beginTransaction();

            // Mark the related task as incomplete
            $assignedTask->taskAssigned->update([
                'status' => false,
                'comments' => 'Not Performed',
            ]);

            // Soft delete the assigned task
            $assignedTask->delete();

            DB::commit();

            return redirect()->route('admin.assigned-tasks.index')
                ->with('success', 'Assigned task deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()
                ->with('error', 'Failed to delete assigned task: ' . $e->getMessage());
        }
    }
}
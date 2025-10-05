<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\JobApplicationAccepted;
use App\Mail\JobApplicationHired;
use App\Mail\JobApplicationRejected;
use App\Models\JobApplicant;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role as ModelsRole;

class JobApplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $applicants = JobApplicant::latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/job-applicants/index', [
            'applicants' => $applicants,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * NOT IMPLEMENTED - applications come from public form.
     */
    public function create(): void
    {
        abort(404, 'Job applications can only be submitted through the public application form.');
    }

    /**
     * Store a newly created resource in storage.
     * NOT IMPLEMENTED - applications come from public form.
     */
    public function store(Request $request): void
    {
        abort(404, 'Job applications can only be submitted through the public application form.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, JobApplicant $jobApplicant): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('admin/job-applicants/show', [
            'applicant' => $jobApplicant,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, JobApplicant $jobApplicant): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('admin/job-applicants/edit', [
            'applicant' => $jobApplicant,
        ]);
    }

    /**
     * Update the specified resource in storage.
     * Only allow updating 'hire' field (toggle).
     */
    public function update(Request $request, JobApplicant $jobApplicant): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'hire' => 'required|boolean',
        ]);

        try {
            $jobApplicant->update([
                'hire' => $validated['hire'],
            ]);

            $message = $validated['hire']
                ? 'Applicant marked as hired successfully.'
                : 'Applicant hire status updated successfully.';

            return redirect()->route('admin.job-applicants.index')
                ->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update applicant: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Request $request, JobApplicant $jobApplicant): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        try {
            $jobApplicant->delete();

            return redirect()->route('admin.job-applicants.index')
                ->with('success', 'Job applicant deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete job applicant: ' . $e->getMessage());
        }
    }

    /**
     * Accept a job application.
     */
    public function accept(Request $request, JobApplicant $jobApplicant): RedirectResponse
    {
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        if ($jobApplicant->status !== 'pending') {
            return redirect()->back()
                ->with('error', 'Only pending applications can be accepted.');
        }

        try {
            $jobApplicant->update([
                'status' => 'accepted',
                'accepted_at' => now(),
            ]);

            // Send acceptance email
            Mail::to($jobApplicant->email)->send(new JobApplicationAccepted($jobApplicant));

            return redirect()->back()
                ->with('success', 'Application accepted and email sent to applicant.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to accept application: ' . $e->getMessage());
        }
    }

    /**
     * Reject a job application.
     */
    public function reject(Request $request, JobApplicant $jobApplicant): RedirectResponse
    {
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        if ($jobApplicant->status === 'hired') {
            return redirect()->back()
                ->with('error', 'Cannot reject a hired applicant.');
        }

        $validated = $request->validate([
            'rejection_reason' => 'nullable|string|max:500',
        ]);

        try {
            $jobApplicant->update([
                'status' => 'rejected',
                'rejected_at' => now(),
                'rejection_reason' => $validated['rejection_reason'] ?? null,
            ]);

            // Send rejection email
            Mail::to($jobApplicant->email)->send(
                new JobApplicationRejected($jobApplicant, $validated['rejection_reason'] ?? null)
            );

            return redirect()->back()
                ->with('success', 'Application rejected and email sent to applicant.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to reject application: ' . $e->getMessage());
        }
    }

    /**
     * Hire an applicant and create technician account.
     */
    public function hire(Request $request, JobApplicant $jobApplicant): RedirectResponse
    {
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        if ($jobApplicant->status === 'hired') {
            return redirect()->back()
                ->with('error', 'This applicant has already been hired.');
        }

        if ($jobApplicant->status !== 'accepted') {
            return redirect()->back()
                ->with('error', 'Only accepted applications can be hired. Please accept the application first.');
        }

        try {
            DB::beginTransaction();

            // Generate initial password
            $password = 'password'; // Simple initial password as requested

            // Create user account
            $user = User::create([
                'name' => $jobApplicant->name,
                'email' => $jobApplicant->email,
                'password' => Hash::make($password),
                'email_verified_at' => now(),
            ]);

            // Assign Technician role
            $technicianRole = ModelsRole::where('name', 'Technician')->first();
            if ($technicianRole) {
                $user->roles()->attach($technicianRole);
            }

            // Update job applicant
            $jobApplicant->update([
                'status' => 'hired',
                'hired_at' => now(),
                'user_id' => $user->id,
                'hire' => true,
            ]);

            DB::commit();

            // Send hire email with credentials
            Mail::to($jobApplicant->email)->send(
                new JobApplicationHired($jobApplicant, $password)
            );

            return redirect()->back()
                ->with('success', 'Applicant hired successfully! Account created and credentials sent via email.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()
                ->with('error', 'Failed to hire applicant: ' . $e->getMessage());
        }
    }
}
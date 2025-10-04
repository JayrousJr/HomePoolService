<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobApplicant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
}

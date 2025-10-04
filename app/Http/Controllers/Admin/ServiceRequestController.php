<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ServiceRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceRequestController extends Controller
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

        $serviceRequests = ServiceRequest::with('techAssign')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/service-requests/index', [
            'service_requests' => $serviceRequests,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        // Get only active clients
        $clients = Client::where('active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/service-requests/create', [
            'clients' => $clients,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|min:5|max:50',
            'email' => 'required|email|min:5|max:50',
            'zip' => 'required|string',
            'phone' => 'required|string|min:5|max:50',
            'service' => 'required|string',
            'description' => 'required|string|min:10|max:1500',
            'assigned' => 'boolean',
            'user_id' => 'nullable|exists:users,id',
        ]);

        try {
            ServiceRequest::create($validated);

            return redirect()->route('admin.service-requests.index')
                ->with('success', 'Service request created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create service request: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, ServiceRequest $serviceRequest): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $serviceRequest->load(['techAssign', 'tasks']);

        return Inertia::render('admin/service-requests/show', [
            'service_request' => $serviceRequest,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, ServiceRequest $serviceRequest): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        // Get only active clients
        $clients = Client::where('active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/service-requests/edit', [
            'service_request' => $serviceRequest,
            'clients' => $clients,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServiceRequest $serviceRequest): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|min:5|max:50',
            'email' => 'required|email|min:5|max:50',
            'zip' => 'required|string',
            'phone' => 'required|string|min:5|max:50',
            'service' => 'required|string',
            'description' => 'required|string|min:10|max:1500',
            'assigned' => 'boolean',
            'user_id' => 'nullable|exists:users,id',
        ]);

        try {
            $serviceRequest->update($validated);

            return redirect()->route('admin.service-requests.index')
                ->with('success', 'Service request updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update service request: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Request $request, ServiceRequest $serviceRequest): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        try {
            $serviceRequest->delete();

            return redirect()->route('admin.service-requests.index')
                ->with('success', 'Service request deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete service request: ' . $e->getMessage());
        }
    }
}

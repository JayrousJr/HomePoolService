<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ClientCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
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

        $clients = Client::with('category')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/clients/index', [
            'clients' => $clients,
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

        $categories = ClientCategory::all();

        return Inertia::render('admin/clients/create', [
            'categories' => $categories,
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
            'client_category_id' => 'required|exists:client_categories,id',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'nationality' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'street' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'zip' => 'nullable|string|max:20',
            'active' => 'boolean',
        ]);

        try {
            Client::create($validated);

            return redirect()->route('admin.clients.index')
                ->with('success', 'Client created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create client: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Client $client): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $client->load(['category', 'requests', 'messages']);

        return Inertia::render('admin/clients/show', [
            'client' => $client,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Client $client): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $categories = ClientCategory::all();

        return Inertia::render('admin/clients/edit', [
            'client' => $client,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'client_category_id' => 'required|exists:client_categories,id',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'nationality' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'street' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'zip' => 'nullable|string|max:20',
            'active' => 'boolean',
        ]);

        try {
            $client->update($validated);

            return redirect()->route('admin.clients.index')
                ->with('success', 'Client updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update client: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Request $request, Client $client): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        try {
            $client->delete();

            return redirect()->route('admin.clients.index')
                ->with('success', 'Client deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete client: ' . $e->getMessage());
        }
    }
}

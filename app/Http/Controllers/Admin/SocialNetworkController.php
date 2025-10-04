<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialNetwork;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SocialNetworkController extends Controller
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

        $socialNetworks = SocialNetwork::latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/social-networks/index', [
            'social_networks' => $socialNetworks,
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

        return Inertia::render('admin/social-networks/create');
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
            'name' => 'required|string|max:255',
            'link' => 'required|url|max:500',
            'icon' => 'required|string|max:255',
        ]);

        try {
            SocialNetwork::create($validated);

            return redirect()->route('admin.social-networks.index')
                ->with('success', 'Social network created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create social network: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, SocialNetwork $socialNetwork): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('admin/social-networks/show', [
            'social_network' => $socialNetwork,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, SocialNetwork $socialNetwork): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('admin/social-networks/edit', [
            'social_network' => $socialNetwork,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SocialNetwork $socialNetwork): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'link' => 'required|url|max:500',
            'icon' => 'required|string|max:255',
        ]);

        try {
            $socialNetwork->update($validated);

            return redirect()->route('admin.social-networks.index')
                ->with('success', 'Social network updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update social network: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Request $request, SocialNetwork $socialNetwork): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        try {
            $socialNetwork->delete();

            return redirect()->route('admin.social-networks.index')
                ->with('success', 'Social network deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete social network: ' . $e->getMessage());
        }
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PopUp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PopUpController extends Controller
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

        $popups = PopUp::latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/popups/index', [
            'popups' => $popups,
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

        return Inertia::render('admin/popups/create');
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
            'head' => 'required|string|max:255',
            'body' => 'required|string|max:1000',
            'action' => 'required|string|max:255',
            'page_to_display' => 'required|string|max:255',
        ]);

        try {
            PopUp::create($validated);

            return redirect()->route('admin.popups.index')
                ->with('success', 'Pop-up created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create pop-up: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, PopUp $popup): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('admin/popups/show', [
            'popup' => $popup,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, PopUp $popup): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('admin/popups/edit', [
            'popup' => $popup,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PopUp $popup): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'head' => 'required|string|max:255',
            'body' => 'required|string|max:1000',
            'action' => 'required|string|max:255',
            'page_to_display' => 'required|string|max:255',
        ]);

        try {
            $popup->update($validated);

            return redirect()->route('admin.popups.index')
                ->with('success', 'Pop-up updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update pop-up: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Request $request, PopUp $popup): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        try {
            $popup->delete();

            return redirect()->route('admin.popups.index')
                ->with('success', 'Pop-up deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete pop-up: ' . $e->getMessage());
        }
    }
}

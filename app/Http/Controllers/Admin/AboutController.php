<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
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

        $abouts = About::latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/about/index', [
            'abouts' => $abouts,
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

        return Inertia::render('admin/about/create');
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
            'about_us' => 'required|string|max:2500',
        ]);

        try {
            About::create($validated);

            return redirect()->route('admin.abouts.index')
                ->with('success', 'About information created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create about information: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, About $about): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('admin/about/show', [
            'about' => $about,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, About $about): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('admin/about/edit', [
            'about' => $about,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, About $about): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'about_us' => 'required|string|max:2500',
        ]);

        try {
            $about->update($validated);

            return redirect()->route('admin.abouts.index')
                ->with('success', 'About information updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update about information: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Request $request, About $about): RedirectResponse
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        try {
            $about->delete();

            return redirect()->route('admin.abouts.index')
                ->with('success', 'About information deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete about information: ' . $e->getMessage());
        }
    }
}
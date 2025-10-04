<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClientCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $categories = ClientCategory::latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/client-categories/index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/client-categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255|unique:client_categories,category',
        ]);

        try {
            ClientCategory::create($validated);

            return redirect()->route('admin.client-categories.index')
                ->with('success', 'Client category created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create client category: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ClientCategory $clientCategory): Response
    {
        $clientCategory->load('clients');

        return Inertia::render('admin/client-categories/show', [
            'category' => $clientCategory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ClientCategory $clientCategory): Response
    {
        return Inertia::render('admin/client-categories/edit', [
            'category' => $clientCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ClientCategory $clientCategory): RedirectResponse
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255|unique:client_categories,category,' . $clientCategory->id,
        ]);

        try {
            $clientCategory->update($validated);

            return redirect()->route('admin.client-categories.index')
                ->with('success', 'Client category updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update client category: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(ClientCategory $clientCategory): RedirectResponse
    {
        try {
            $clientCategory->delete();

            return redirect()->route('admin.client-categories.index')
                ->with('success', 'Client category deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete client category: ' . $e->getMessage());
        }
    }
}

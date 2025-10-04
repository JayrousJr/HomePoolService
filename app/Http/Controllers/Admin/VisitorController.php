<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VisitorController extends Controller
{
    /**
     * Display a listing of the resource.
     * Show all visitors, paginated, latest first.
     */
    public function index(Request $request): Response
    {
        // Check if user is manager/admin
        if (!$request->user()->isManager()) {
            abort(403, 'Unauthorized action.');
        }

        $visitors = Visitor::latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/visitors/index', [
            'visitors' => $visitors,
        ]);
    }
}

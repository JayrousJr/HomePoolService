<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Mail\ServiceReply;
use App\Mail\ServiceSent;
use App\Models\ServiceRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ServiceRequestController extends Controller
{
    /**
     * Store a new service request from public form.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate request data
        $validated = $request->validate([
            'name' => 'required|string|min:5|max:50',
            'email' => 'required|email|min:5|max:50',
            'zip' => 'required',
            'phone' => 'required|string|min:5|max:50',
            'service' => 'required',
            'description' => 'required|string|min:10',
        ]);

        DB::beginTransaction();

        try {
            // Create service request
            ServiceRequest::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'zip' => $validated['zip'],
                'phone' => $validated['phone'],
                'service' => $validated['service'],
                'description' => $validated['description'],
                'assigned' => false,
            ]);

            // TODO: Send emails
            Mail::to(config('mail.from.address', 'customerservices@homepool.org'))->send(new ServiceSent($serviceRequest));
            Mail::to($validated['email'])->send(new ServiceReply($serviceRequest));

            DB::commit();

            return redirect()->route('home')
                ->with('success', 'Your service request has been submitted successfully! We will contact you soon.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Service request failed: ' . $e->getMessage());

            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to submit service request. Please try again.');
        }
    }
}
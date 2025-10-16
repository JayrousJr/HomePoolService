<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Mail\JobApplicationReceivedNotification;
use App\Mail\ServiceSent;
use App\Models\JobApplicant;
use App\Models\ToggleJob;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class JobApplicationController extends Controller
{
    /**
     * Show the careers/job application page.
     */
    public function index(): Response
    {
        $toggelApplication = ToggleJob::first();

        return Inertia::render('public/careers',[
             'applicationWindow' => $toggelApplication,
        ]);
    }

    /**
     * Store a new job application.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:50',
            'email' => 'required|email|unique:job_applicants,email',
            'phone' => 'required|string|min:10|max:20',
            'nationality' => 'required|string|max:50',
            'city' => 'required|string|max:50',
            'state' => 'required|string|max:50',
            'street' => 'required|string|max:100',
            'zip' => 'required|string|max:10',
            'age' => 'required|integer|min:18|max:100',
            'birthdate' => 'required|date',
            'socialsecurity' => 'required|in:yes,no',
            'socialsecurityNumber' => 'nullable|string|max:20',
            'einNumber' => 'nullable|string|max:20',
            'days' => 'required|array|min:1',
            'days.*' => 'string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
            'starttime' => 'required|string',
            'endtime' => 'required|string',
            'startdate' => 'required|date',
            'workperiod' => 'required|string|in:full-time,part-time,temporary,seasonal',
            'workHours' => 'required|integer|min:1|max:168',
            'smoke' => 'required|in:yes,no',
            'licence' => 'required|in:yes,no',
            'licenceNumber' => 'nullable|string|max:50',
            'issueddate' => 'nullable|date',
            'expiredate' => 'nullable|date',
            'issuedcity' => 'nullable|string|max:50',
            'transport' => 'required|in:yes,no',
        ]);

        try {
                $user =  JobApplicant::create($validated);

                Mail::to(config('mail.from.address', 'customerservices@homepool.org'))
                ->send(new JobApplicationReceivedNotification($user));

            
            return redirect()->back()
                ->with('success', 'Your application has been submitted successfully! We will review it and get back to you soon.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to submit application. Please try again. Error: ' . $e->getMessage());
        }
    }
}
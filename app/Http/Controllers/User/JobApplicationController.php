<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\JobApplicant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class JobApplicationController extends Controller
{
    /**
     * Show job application form (authenticated users only).
     */
    public function create(): Response
    {
        return Inertia::render('user/jobapplication');
    }

    /**
     * Store job application with comprehensive validation.
     */
    public function store(Request $request): RedirectResponse
    {
        // Ensure user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login')
                ->with('error', 'You must be logged in to apply for a job.');
        }

        $user = Auth::user();

        // Comprehensive validation based on SYSTEM_ANALYSIS.txt
        $validated = $request->validate([
            // Personal Information
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:job_applicants,email',
            'nationality' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'zip' => 'required|integer|min_digits:3|max_digits:6',

            // Demographics
            'gender' => 'required|in:Male,Female',
            'age' => 'required|integer|between:18,45',
            'birthdate' => 'required|date|date_format:Y-m-d',

            // Work Details
            'days' => 'required|array|min:2|max:6',
            'days.*' => 'required|string',
            'starttime' => 'required|string',
            'endtime' => 'required|string',
            'startdate' => 'required|date|date_format:Y-m-d',
            'workperiod' => 'required|integer|between:3,12',
            'workHours' => 'required|integer|between:30,170',

            // Social Security / EIN
            'socialsecurity' => 'required|in:SSN,EIN',
            'socialsecurityNumber' => 'nullable|min:11|max:11|unique:job_applicants,socialsecurityNumber',
            'einNumber' => 'nullable|min:10|max:10|unique:job_applicants,einNumber',

            // License Information
            'licence' => 'required',
            'licenceNumber' => 'nullable|string|max:255|min:6',
            'issueddate' => 'nullable|date|date_format:Y-m-d',
            'expiredate' => 'nullable|date|date_format:Y-m-d',
            'issuedcity' => 'nullable|string|max:255',

            // Other
            'smoke' => 'required',
            'transport' => 'required',
        ], [
            // Custom error messages
            'age.between' => 'Applicants must be between 18 and 45 years old.',
            'days.min' => 'You must select at least 2 working days.',
            'days.max' => 'You cannot select more than 6 working days.',
            'workperiod.between' => 'Work period must be between 3 and 12 months.',
            'workHours.between' => 'Work hours must be between 30 and 170 hours per week.',
            'zip.min_digits' => 'ZIP code must be at least 3 digits.',
            'zip.max_digits' => 'ZIP code cannot exceed 6 digits.',
            'email.unique' => 'You have already submitted a job application.',
        ]);

        // Validate SSN or EIN is provided based on selection
        if ($validated['socialsecurity'] === 'SSN') {
            if (empty($validated['socialsecurityNumber'])) {
                return redirect()->back()
                    ->withInput()
                    ->withErrors(['socialsecurityNumber' => 'Social Security Number is required.']);
            }
        } elseif ($validated['socialsecurity'] === 'EIN') {
            if (empty($validated['einNumber'])) {
                return redirect()->back()
                    ->withInput()
                    ->withErrors(['einNumber' => 'EIN Number is required.']);
            }
        }

        // Validate license details if licence is YES
        if (strtoupper($validated['licence']) === 'YES') {
            $licenseValidation = $request->validate([
                'licenceNumber' => 'required|string|max:255|min:6',
                'issueddate' => 'required|date|date_format:Y-m-d',
                'expiredate' => 'required|date|date_format:Y-m-d',
                'issuedcity' => 'required|string|max:255',
            ]);
            $validated = array_merge($validated, $licenseValidation);
        }

        DB::beginTransaction();

        try {
            // Create job application
            JobApplicant::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'nationality' => $validated['nationality'],
                'city' => $validated['city'],
                'state' => $validated['state'],
                'street' => $validated['street'],
                'phone' => $validated['phone'],
                'zip' => $validated['zip'],
                'age' => $validated['age'],
                'birthdate' => $validated['birthdate'],
                'socialsecurity' => $validated['socialsecurity'],
                'socialsecurityNumber' => $validated['socialsecurityNumber'] ?? 'NULL',
                'einNumber' => $validated['einNumber'] ?? 'NULL',
                'days' => $validated['days'], // Automatically cast to JSON
                'starttime' => $validated['starttime'],
                'endtime' => $validated['endtime'],
                'startdate' => $validated['startdate'],
                'workperiod' => $validated['workperiod'],
                'workHours' => $validated['workHours'],
                'smoke' => $validated['smoke'],
                'licence' => $validated['licence'],
                'licenceNumber' => $validated['licenceNumber'] ?? 'NULL',
                'issueddate' => $validated['issueddate'] ?? 'NULL',
                'expiredate' => $validated['expiredate'] ?? 'NULL',
                'issuedcity' => $validated['issuedcity'] ?? 'NULL',
                'transport' => $validated['transport'],
                'hire' => false,
            ]);

            // TODO: Send emails
            // Mail::to('familypoolservice2020@gmail.com')->send(new JobSent($application));
            // Mail::to($validated['email'])->send(new JobReceived($application));

            DB::commit();

            return redirect()->route('home')
                ->with('success', 'Your job application has been submitted successfully! We will review it and contact you soon.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Job application failed: ' . $e->getMessage());

            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to submit job application. Please try again.');
        }
    }
}

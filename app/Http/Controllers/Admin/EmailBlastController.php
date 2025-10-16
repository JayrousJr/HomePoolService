<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\EmailBlastMail;
use App\Models\EmailBlast;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class EmailBlastController extends Controller
{
    /**
     * Display a listing of email blasts.
     */
    public function index(Request $request): Response
    {
        $emailBlasts = EmailBlast::with('sender')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/email-blasts/index', [
            'email_blasts' => $emailBlasts,
        ]);
    }

    /**
     * Show the form for creating a new email blast.
     */
    public function create(): Response
    {
        return Inertia::render('admin/email-blasts/create');
    }

    /**
     * Store and send a new email blast.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'recipients' => 'required|string', // Comma or newline separated emails
        ]);

        // Parse recipients - split by comma or newline
        $recipientsString = $validated['recipients'];
        $recipients = preg_split('/[\s,;]+/', $recipientsString, -1, PREG_SPLIT_NO_EMPTY);

        // Validate and filter emails
        $validEmails = array_filter($recipients, function($email) {
            return filter_var(trim($email), FILTER_VALIDATE_EMAIL);
        });

        $validEmails = array_map('trim', $validEmails);
        $validEmails = array_unique($validEmails);

        if (empty($validEmails)) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['recipients' => 'No valid email addresses found.']);
        }

        try {
            // Send email immediately using BCC (recipients won't see each other)
            $mailable = new EmailBlastMail($validated['subject'], $validated['message']);

            Mail::to(config('mail.from.address', 'customerservices@homepool.org'))
                ->bcc($validEmails)
                ->send($mailable);

            // Create email blast record after successful send
            EmailBlast::create([
                'subject' => $validated['subject'],
                'message' => $validated['message'],
                'recipients' => $validEmails,
                'recipients_count' => count($validEmails),
                'sent_by' => $request->user()->id,
                'sent_at' => now(),
            ]);

            return redirect()->route('admin.email-blasts.index')
                ->with('success', 'Email sent successfully to ' . count($validEmails) . ' recipients.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to send email: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified email blast.
     */
    public function show(EmailBlast $emailBlast): Response
    {
        $emailBlast->load('sender');

        return Inertia::render('admin/email-blasts/show', [
            'email_blast' => $emailBlast,
        ]);
    }

    /**
     * Remove the specified email blast from storage.
     */
    public function destroy(EmailBlast $emailBlast): RedirectResponse
    {
        $emailBlast->delete();

        return redirect()->route('admin.email-blasts.index')
            ->with('success', 'Email blast deleted successfully.');
    }
}
<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    /**
     * Store a new contact message.
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            // Validate message data
            $validated = $request->validate([
                'name' => 'required|string|max:30',
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:20',
                'subject' => 'required|string|min:2|max:255',
                'message' => 'required|string|min:3|max:1000',
            ]);

            // Create message
            Message::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'subject' => $validated['subject'],
                'message' => $validated['message'],
            ]);

            // TODO: Send emails
            // Mail::to('Homepoolservice2020@gmail.com')->send(new MessageSent($message));
            // Mail::to($validated['email'])->send(new MessageReceived($message));

            return redirect()->back()
                ->with('success', 'Thank you for contacting us! We will get back to you soon.');
        } catch (\Exception $e) {
            Log::error('Message submission failed: ' . $e->getMessage());

            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to send message. Please try again.');
        }
    }
}
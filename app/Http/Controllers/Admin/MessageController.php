<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     * List all messages, paginated, latest first.
     */
    public function index(): Response
    {
        $messages = Message::latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/messages/index', [
            'messages' => $messages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/messages/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255|min:2',
            'message' => 'required|string|max:3000|min:3',
        ]);

        try {
            Message::create($validated);

            return redirect()->route('admin.messages.index')
                ->with('success', 'Message created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create message: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message): Response
    {
        return Inertia::render('admin/messages/show', [
            'message' => $message,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message): Response
    {
        return Inertia::render('admin/messages/edit', [
            'message' => $message,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:30',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255|min:2',
            'message' => 'required|string|max:3000|min:3',
        ]);

        try {
            $message->update($validated);

            return redirect()->route('admin.messages.index')
                ->with('success', 'Message updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update message: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     */
    public function destroy(Message $message): RedirectResponse
    {
        try {
            $message->delete();

            return redirect()->route('admin.messages.index')
                ->with('success', 'Message deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete message: ' . $e->getMessage());
        }
    }

    /**
     * Send email reply to message sender.
     */
    public function reply(Request $request, Message $message): RedirectResponse
    {
        $validated = $request->validate([
            'reply_subject' => 'required|string|max:255',
            'reply_body' => 'required|string|min:10',
        ]);

        try {
            // Send email to the message sender
            Mail::send([], [], function ($mail) use ($message, $validated) {
                $mail->to($message->email)
                    ->subject($validated['reply_subject'])
                    ->html($validated['reply_body']);
            });

            return redirect()->back()
                ->with('success', 'Reply sent successfully to ' . $message->email);
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to send reply: ' . $e->getMessage());
        }
    }
}

<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailBlastMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $emailSubject;
    public string $messageContent;

    /**
     * Create a new message instance.
     */
    public function __construct(string $subject, string $messageContent)
    {
        $this->emailSubject = $subject;
        $this->messageContent = $messageContent;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->emailSubject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            htmlString: $this->messageContent,
        );
    }
}
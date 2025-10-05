<x-mail::message>
# Application Status Update

Dear {{ $applicant->name }},

Thank you for taking the time to apply for the Technician position at {{ config('app.name') }}.

After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.

@if($reason)
## Feedback

{{ $reason }}
@endif

We appreciate your interest in joining our team and wish you the best in your job search and future endeavors.

## Application Details

- **Name:** {{ $applicant->name }}
- **Applied On:** {{ $applicant->created_at->format('F d, Y') }}
- **Status:** Not Selected

Thank you again for your interest in {{ config('app.name') }}.

Best regards,<br>
{{ config('app.name') }} Hiring Team
</x-mail::message>

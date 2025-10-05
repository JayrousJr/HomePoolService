<x-mail::message>
# Congratulations {{ $applicant->name }}!

We are pleased to inform you that your application for the Technician position has been **accepted**.

## Next Steps

Our hiring team will review your application further and will be in touch soon regarding the next steps in the hiring process.

Please keep an eye on your email for further communications from us.

## Application Details

- **Name:** {{ $applicant->name }}
- **Email:** {{ $applicant->email }}
- **Applied On:** {{ $applicant->created_at->format('F d, Y') }}
- **Status:** Accepted

If you have any questions in the meantime, please don't hesitate to reach out to us.

Best regards,<br>
{{ config('app.name') }} Hiring Team
</x-mail::message>

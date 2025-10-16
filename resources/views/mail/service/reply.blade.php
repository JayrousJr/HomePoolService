<x-mail::message>
# Thank You for Your Service Request

Dear **{{ $serviceRequest->name }}**,

Thank you for submitting your service request to {{ config('app.name') }}. We have received your request and our team will review it shortly.

## Your Request Details:

**Service:** {{ $serviceRequest->service }}  
**ZIP Code:** {{ $serviceRequest->zip }}  
**Phone:** {{ $serviceRequest->phone }}

## What You Requested:

{{ $serviceRequest->description }}

---

One of our team members will contact you within 24-48 hours to discuss your service needs and schedule an appointment.

If you have any urgent questions, please feel free to contact us directly:

**Email:** {{ config('mail.from.address') }}  
**Phone:** [Your phone number]

<x-mail::button :url="config('app.url')">
Visit Our Website
</x-mail::button>

We look forward to serving you!

Best regards,<br>
{{ config('app.name') }} Team
</x-mail::message>

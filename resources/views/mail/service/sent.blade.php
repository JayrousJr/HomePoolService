<x-mail::message>
# New Service Request Received

A new service request has been submitted by **{{ $serviceRequest->name }}**.

## Request Details:

**Name:** {{ $serviceRequest->name }}  
**Email:** {{ $serviceRequest->email }}  
**Phone:** {{ $serviceRequest->phone }}  
**ZIP Code:** {{ $serviceRequest->zip }}  
**Service:** {{ $serviceRequest->service }}

## Description:

{{ $serviceRequest->description }}

---

**Submitted:** {{ $serviceRequest->created_at->format('F d, Y \a\t h:i A') }}

<x-mail::button :url="config('app.url') . '/admin/service-requests/' . $serviceRequest->id">
View Request
</x-mail::button>

Please respond to this request as soon as possible.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

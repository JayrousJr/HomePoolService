<x-mail::message>
{!! $messageContent !!}

---

Regards,<br>
Amani Joel.<br>
Technical Staff, Home pool Service<br>
{{ config('app.name') }}


<x-mail::subcopy>
This email was sent from {{ config('app.name') }}.

If you wish to unsubscribe from future emails, please contact us at {{ config('mail.from.address') }}.
</x-mail::subcopy>
</x-mail::message>

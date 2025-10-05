<x-mail::message>
# Account Access Suspended

Dear {{ $user->name }},

This is to inform you that your technician account access has been **temporarily suspended**.

## Account Status

- **Name:** {{ $user->name }}
- **Email:** {{ $user->email }}
- **Status:** Suspended

During this suspension period, you will not be able to access the system or perform any tasks.

If you believe this is an error or have any questions regarding this suspension, please contact your supervisor or our HR department immediately.

Best regards,<br>
{{ config('app.name') }} Management
</x-mail::message>

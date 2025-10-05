<x-mail::message>
# Account Access Restored

Dear {{ $user->name }},

We are pleased to inform you that your account access has been **restored**.

## Account Status

- **Name:** {{ $user->name }}
- **Email:** {{ $user->email }}
- **Status:** Active

You can now log in to the system and resume your work-related tasks.

<x-mail::button :url="config('app.url') . '/login'">
Login to Your Account
</x-mail::button>

If you have any questions or concerns, please contact your supervisor or our HR department.

Best regards,<br>
{{ config('app.name') }} Management
</x-mail::message>

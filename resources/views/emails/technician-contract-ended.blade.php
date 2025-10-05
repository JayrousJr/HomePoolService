<x-mail::message>
# Contract Termination Notice

Dear {{ $user->name }},

We are writing to inform you that your employment contract with {{ config('app.name') }} has been terminated.

## Contract Details

- **Name:** {{ $user->name }}
- **Email:** {{ $user->email }}
- **Status:** Contract Ended

Your access to the system has been revoked, and you will no longer be able to log in or perform any work-related tasks.

## Next Steps

Please ensure that you:
- Return any company property in your possession
- Complete any pending administrative requirements
- Contact HR for any final paperwork or questions

We thank you for your service and wish you the best in your future endeavors.

If you have any questions regarding this termination, please contact our HR department.

Best regards,<br>
{{ config('app.name') }} Management
</x-mail::message>

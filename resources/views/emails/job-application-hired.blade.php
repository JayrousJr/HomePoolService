<x-mail::message>
# Congratulations {{ $applicant->name }}! 🎉

We are thrilled to inform you that you have been **hired** as a Technician at {{ config('app.name') }}!

Welcome to our team! We're excited to have you join us.

## Your Account Details

We've created your technician account in our system. Here are your login credentials:

<x-mail::panel>
**Email:** {{ $applicant->email }}<br>
**Password:** {{ $password }}
</x-mail::panel>

<x-mail::button :url="config('app.url') . '/login'">
Login to Your Account
</x-mail::button>

**IMPORTANT:** Please change your password after your first login for security purposes.

## Next Steps

1. Log in to your account using the credentials above
2. Update your profile and change your password
3. Review your dashboard and assigned tasks
4. Wait for further instructions from your supervisor

## Getting Started

Once you log in, you'll have access to:
- Your personal dashboard
- Assigned tasks and schedules
- Client information
- Service request management

If you have any questions or need assistance, please don't hesitate to contact us.

We look forward to working with you!

Best regards,<br>
{{ config('app.name') }} Team
</x-mail::message>

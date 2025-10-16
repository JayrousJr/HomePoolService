import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface EmailBlast {
    id: string;
    subject: string;
    message: string;
    recipients: string[];
    recipients_count: number;
    sent_at: string;
    sender: {
        name: string;
        email: string;
    };
}

interface EmailBlastShowProps {
    email_blast: EmailBlast;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Email Blasts',
        href: admin.emailBlasts.index().url,
    },
    {
        title: 'View Email',
    },
];

export default function EmailBlastShow({ email_blast }: EmailBlastShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Email: ${email_blast.subject}`} />

            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Email Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Subject</p>
                            <p className="text-lg font-semibold">{email_blast.subject}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Sent By</p>
                                <p>{email_blast.sender.name}</p>
                                <p className="text-sm text-muted-foreground">{email_blast.sender.email}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Sent At</p>
                                <p>{new Date(email_blast.sent_at).toLocaleString()}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">
                                Recipients ({email_blast.recipients_count})
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {email_blast.recipients.map((email, index) => (
                                    <Badge key={index} variant="secondary">
                                        {email}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                            <div
                                className="prose max-w-none p-4 border rounded-lg bg-muted/50"
                                dangerouslySetInnerHTML={{ __html: email_blast.message }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

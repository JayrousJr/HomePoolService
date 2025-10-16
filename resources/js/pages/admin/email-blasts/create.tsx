import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Mail } from 'lucide-react';

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
        title: 'Send Email',
    },
];

export default function EmailBlastCreate() {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        message: '',
        recipients: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.emailBlasts.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Send Email Blast" />

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        <div>
                            <CardTitle>Send Email Blast</CardTitle>
                            <CardDescription>
                                Send emails to multiple recipients. Recipients won't see each other's email addresses.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject *</Label>
                            <Input
                                id="subject"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                placeholder="Enter email subject"
                                required
                            />
                            {errors.subject && (
                                <p className="text-sm text-destructive">{errors.subject}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="recipients">Recipients *</Label>
                            <Textarea
                                id="recipients"
                                value={data.recipients}
                                onChange={(e) => setData('recipients', e.target.value)}
                                placeholder="Enter email addresses separated by commas or new lines&#10;Example:&#10;user1@example.com, user2@example.com&#10;user3@example.com"
                                rows={6}
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                Enter multiple email addresses separated by commas, spaces, or new lines
                            </p>
                            {errors.recipients && (
                                <p className="text-sm text-destructive">{errors.recipients}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message *</Label>
                            <Textarea
                                id="message"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                placeholder="Enter your email message (HTML supported)"
                                rows={12}
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                You can use HTML formatting in your message
                            </p>
                            {errors.message && (
                                <p className="text-sm text-destructive">{errors.message}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Sending...' : 'Send Email'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

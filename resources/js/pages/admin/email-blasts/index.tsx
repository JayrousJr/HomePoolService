import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2, Plus, Mail } from 'lucide-react';

interface EmailBlast {
    id: string;
    subject: string;
    recipients_count: number;
    sent_at: string;
    sender: {
        name: string;
    };
}

interface EmailBlastsIndexProps {
    email_blasts: PaginatedData<EmailBlast>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Email Blasts',
    },
];

export default function EmailBlastsIndex({ email_blasts }: EmailBlastsIndexProps) {
    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this email blast record?')) {
            router.delete(admin.emailBlasts.destroy({ email_blast: id }).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Email Blasts" />

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        <CardTitle>Email Blasts</CardTitle>
                    </div>
                    <Link href={admin.emailBlasts.create().url}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Send Email
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Recipients</TableHead>
                                    <TableHead>Sent By</TableHead>
                                    <TableHead>Sent At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {email_blasts.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            No email blasts found. Click "Send Email" to create one.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    email_blasts.data.map((blast) => (
                                        <TableRow key={blast.id}>
                                            <TableCell className="font-medium">{blast.subject}</TableCell>
                                            <TableCell>{blast.recipients_count} recipients</TableCell>
                                            <TableCell>{blast.sender.name}</TableCell>
                                            <TableCell>
                                                {new Date(blast.sent_at).toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={admin.emailBlasts.show({ email_blast: blast.id }).url}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(blast.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {email_blasts.data.length > 0 && (
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-sm text-muted-foreground">
                                Showing {email_blasts.from} to {email_blasts.to} of {email_blasts.total} results
                            </p>
                            <div className="flex gap-2">
                                {email_blasts.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary hover:bg-secondary/80'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </AppLayout>
    );
}

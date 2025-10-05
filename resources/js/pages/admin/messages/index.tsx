import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Message, type PaginatedData } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Mail, MailOpen, Trash2 } from 'lucide-react';

interface MessagesIndexProps {
    messages: PaginatedData<Message>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Messages',
        href: admin.messages.index().url,
    },
];

export default function MessagesIndex({ messages }: MessagesIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(admin.messages.destroy({ message: id }).url);
        }
    };

    const unreadCount = messages.data.filter((msg) => !msg.read).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Messages
                        </h1>
                        <p className="text-muted-foreground">
                            Contact form submissions and customer inquiries
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="px-4 py-2 text-base"
                        >
                            {unreadCount} Message(s)
                        </Badge>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Messages ({messages.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Email
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Phone
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Subject
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Created At
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No messages found
                                            </td>
                                        </tr>
                                    ) : (
                                        messages.data.map((message) => (
                                            <tr
                                                key={message.id}
                                                className={`border-b transition-colors hover:bg-accent/50 ${
                                                    !message.read
                                                        ? 'bg-blue-50/50 dark:bg-blue-950/20'
                                                        : ''
                                                }`}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        {message.read ? (
                                                            <MailOpen className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <Mail className="h-4 w-4 text-blue-600" />
                                                        )}
                                                        {message.replied && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                Replied
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {message.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {message.email}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {message.phone || 'N/A'}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <div className="max-w-xs truncate">
                                                        {message.subject}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {new Date(
                                                        message.created_at,
                                                    ).toLocaleDateString()}
                                                    <div className="text-xs">
                                                        {new Date(
                                                            message.created_at,
                                                        ).toLocaleTimeString()}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={
                                                                admin.messages.show(
                                                                    {
                                                                        message:
                                                                            message.id,
                                                                    },
                                                                ).url
                                                            }
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    message.id,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {messages.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {messages.from} to {messages.to} of{' '}
                                    {messages.total} results
                                </div>
                                <div className="flex gap-2">
                                    {messages.links.map((link, index) => {
                                        if (!link.url) {
                                            return (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    size="sm"
                                                    disabled
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            );
                                        }

                                        return (
                                            <Link key={index} href={link.url}>
                                                <Button
                                                    variant={
                                                        link.active
                                                            ? 'default'
                                                            : 'outline'
                                                    }
                                                    size="sm"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

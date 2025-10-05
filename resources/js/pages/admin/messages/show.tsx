import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Message } from '@/types/models';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Mail,
    MailOpen,
    Phone,
    Send,
    Trash2,
    User,
} from 'lucide-react';

interface MessageShowProps {
    message: Message & {
        client?: { id: string; name: string; email: string };
    };
}

export default function MessageShow({ message }: MessageShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Messages', href: admin.messages.index().url },
        {
            title: message.name,
            href: admin.messages.show({ message: message.id }).url,
        },
    ];

    const { data, setData, post, processing } = useForm({
        reply: '',
    });

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(admin.messages.destroy({ message: message.id }).url);
        }
    };

    const handleReply = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.messages.reply({ message: message.id }).url, {
            onSuccess: () => {
                setData('reply', '');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Message: ${message.subject}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={admin.messages.index().url}>
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">
                                {message.subject}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Message Details
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Message Status */}
                <div className="flex gap-2">
                    {message.read ? (
                        <Badge variant="secondary">
                            <MailOpen className="mr-1 h-3 w-3" />
                            Read
                        </Badge>
                    ) : (
                        <Badge variant="default">
                            <Mail className="mr-1 h-3 w-3" />
                            Unread
                        </Badge>
                    )}
                    {message.replied && (
                        <Badge variant="outline">
                            <Send className="mr-1 h-3 w-3" />
                            Replied
                        </Badge>
                    )}
                </div>

                {/* Message Information */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sender Information</CardTitle>
                            <CardDescription>
                                Contact details of the sender
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Name</p>
                                    <p className="text-sm text-muted-foreground">
                                        {message.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <a
                                        href={`mailto:${message.email}`}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {message.email}
                                    </a>
                                </div>
                            </div>
                            {message.phone && (
                                <div className="flex items-start gap-3">
                                    <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Phone
                                        </p>
                                        <a
                                            href={`tel:${message.phone}`}
                                            className="text-sm text-muted-foreground hover:text-primary"
                                        >
                                            {message.phone}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {message.client && (
                                <div className="flex items-start gap-3">
                                    <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Associated Client
                                        </p>
                                        <Link
                                            href={
                                                admin.clients.show({
                                                    client: message.client.id,
                                                }).url
                                            }
                                            className="text-sm text-primary hover:underline"
                                        >
                                            {message.client.name}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Message Details</CardTitle>
                            <CardDescription>
                                Timestamp and metadata
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Received
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(
                                            message.created_at,
                                        ).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(
                                            message.created_at,
                                        ).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Message Content */}
                <Card>
                    <CardHeader>
                        <CardTitle>Message Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">
                                {message.subject}
                            </h3>
                            <Separator />
                            <div className="rounded-lg bg-muted/50 p-4 whitespace-pre-wrap">
                                {message.message}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Reply Form */}
                {/* <Card>
                    <CardHeader>
                        <CardTitle>Send Reply</CardTitle>
                        <CardDescription>
                            Reply to this message via email
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleReply} className="space-y-4">
                            <div>
                                <Textarea
                                    placeholder="Type your reply here..."
                                    value={data.reply}
                                    onChange={(e) =>
                                        setData('reply', e.target.value)
                                    }
                                    rows={6}
                                    className="resize-none"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Reply will be sent to: {message.email}
                                </p>
                                <Button type="submit" disabled={processing}>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Reply
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card> */}
            </div>
        </AppLayout>
    );
}

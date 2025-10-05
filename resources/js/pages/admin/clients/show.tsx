import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Client, type Message, type ServiceRequest } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Edit,
    FileText,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Trash2,
    User,
    XCircle,
} from 'lucide-react';

interface ClientShowProps {
    client: Client & {
        category?: { id: string; category: string };
        requests?: ServiceRequest[];
        messages?: Message[];
    };
}

export default function ClientShow({ client }: ClientShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Clients', href: admin.clients.index().url },
        {
            label: client.name,
            href: admin.clients.show({ client: client.id }).url,
        },
    ];

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this client?')) {
            router.delete(admin.clients.destroy({ client: client.id }).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Client: ${client.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={admin.clients.index().url}>
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">
                                {client.name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Client Details
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={admin.clients.edit({ client: client.id }).url}
                        >
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Client Information */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>
                                Primary contact details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Name</p>
                                    <p className="text-sm text-muted-foreground">
                                        {client.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <a
                                        href={`mailto:${client.email}`}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {client.email}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <a
                                        href={`tel:${client.phone}`}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {client.phone}
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Location Details</CardTitle>
                            <CardDescription>
                                Address and location information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Address
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {client.street}
                                        <br />
                                        {client.city}, {client.state}{' '}
                                        {client.zip}
                                        <br />
                                        {client.nationality}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Category
                                    </p>
                                    <Badge variant="outline">
                                        {client.category?.category || 'No Category'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                {client.active ? (
                                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                                ) : (
                                    <XCircle className="mt-0.5 h-5 w-5 text-red-500" />
                                )}
                                <div>
                                    <p className="text-sm font-medium">
                                        Status
                                    </p>
                                    <Badge
                                        variant={
                                            client.active
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {client.active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Service Requests */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Service Requests
                                </CardTitle>
                                <CardDescription>
                                    All service requests from this client
                                </CardDescription>
                            </div>
                            <Badge variant="outline">
                                {client.requests?.length || 0} Requests
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {client.requests && client.requests.length > 0 ? (
                            <div className="space-y-4">
                                {client.requests.map((request) => (
                                    <div
                                        key={request.id}
                                        className="flex items-start justify-between rounded-lg border p-4"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium">
                                                {request.service}
                                            </p>
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {request.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(
                                                        request.created_at,
                                                    ).toLocaleDateString()}
                                                </span>
                                                <Badge
                                                    variant={
                                                        request.assigned
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                    className="text-xs"
                                                >
                                                    {request.assigned
                                                        ? 'Assigned'
                                                        : 'Pending'}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Link
                                            href={
                                                admin.serviceRequests.show({
                                                    serviceRequest: request.id,
                                                }).url
                                            }
                                        >
                                            <Button variant="outline" size="sm">
                                                View
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No service requests yet
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Messages */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Messages
                                </CardTitle>
                                <CardDescription>
                                    All messages from this client
                                </CardDescription>
                            </div>
                            <Badge variant="outline">
                                {client.messages?.length || 0} Messages
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {client.messages && client.messages.length > 0 ? (
                            <div className="space-y-4">
                                {client.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className="space-y-2 rounded-lg border p-4"
                                    >
                                        <div className="flex items-start justify-between">
                                            <p className="font-medium">
                                                {message.subject}
                                            </p>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(
                                                    message.created_at,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {message.message}
                                        </p>
                                        {message.phone && (
                                            <p className="text-xs text-muted-foreground">
                                                Phone: {message.phone}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No messages yet
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

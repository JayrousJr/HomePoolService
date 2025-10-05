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
import { type ServiceRequest, type Task } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckSquare,
    Edit,
    FileText,
    ListTodo,
    Mail,
    MapPin,
    Phone,
    Trash2,
    User,
    UserPlus,
} from 'lucide-react';

interface ServiceRequestShowProps {
    service_request: ServiceRequest & {
        techAssign?: { id: string; name: string; email: string };
        tasks?: Task[];
    };
}

export default function ServiceRequestShow({
    service_request,
}: ServiceRequestShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Service Requests',
            href: admin.serviceRequests.index().url,
        },
        {
            title: `${service_request.service}`,
            href: admin.serviceRequests.show({
                service_request: service_request.id,
            }).url,
        },
    ];

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this service request?')) {
            router.delete(
                admin.serviceRequests.destroy({
                    service_request: service_request.id,
                }).url,
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Service Request: ${service_request.service}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={admin.serviceRequests.index().url}>
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">
                                {service_request.service}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Service Request Details
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={
                                admin.serviceRequests.edit({
                                    service_request: service_request.id,
                                }).url
                            }
                        >
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        {!service_request.assigned && (
                            <Link
                                href={
                                    admin.tasks.create().url +
                                    `?service_request_id=${service_request.id}`
                                }
                            >
                                <Button>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Assign Task
                                </Button>
                            </Link>
                        )}
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Request Information */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Information</CardTitle>
                            <CardDescription>
                                Requester contact details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Name</p>
                                    <p className="text-sm text-muted-foreground">
                                        {service_request.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <a
                                        href={`mailto:${service_request.email}`}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {service_request.email}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Phone
                                    </p>
                                    <a
                                        href={`tel:${service_request.phone}`}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {service_request.phone}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        ZIP Code
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {service_request.zip}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Request Details</CardTitle>
                            <CardDescription>
                                Service type and status
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Service Type
                                    </p>
                                    <Badge variant="outline">
                                        {service_request.service}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                {service_request.assigned ? (
                                    <CheckSquare className="mt-0.5 h-5 w-5 text-green-500" />
                                ) : (
                                    <UserPlus className="mt-0.5 h-5 w-5 text-orange-500" />
                                )}
                                <div>
                                    <p className="text-sm font-medium">
                                        Status
                                    </p>
                                    <Badge
                                        variant={
                                            service_request.assigned
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {service_request.assigned
                                            ? 'Assigned'
                                            : 'Unassigned'}
                                    </Badge>
                                </div>
                            </div>
                            {service_request.techAssign && (
                                <div className="flex items-start gap-3">
                                    <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Assigned Technician
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {service_request.techAssign.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {service_request.techAssign.email}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Created At
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(
                                            service_request.created_at,
                                        ).toLocaleDateString()}{' '}
                                        {new Date(
                                            service_request.created_at,
                                        ).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Description */}
                <Card>
                    <CardHeader>
                        <CardTitle>Service Description</CardTitle>
                        <CardDescription>
                            Details about the requested service
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                            {service_request.description}
                        </p>
                    </CardContent>
                </Card>

                {/* Related Tasks */}
                {service_request.tasks && service_request.tasks.length > 0 && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <ListTodo className="h-5 w-5" />
                                        Related Tasks
                                    </CardTitle>
                                    <CardDescription>
                                        Tasks created from this service request
                                    </CardDescription>
                                </div>
                                <Badge variant="outline">
                                    {service_request.tasks.length} Tasks
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {service_request.tasks.map((task: any) => (
                                    <div
                                        key={task.id}
                                        className="flex items-start justify-between rounded-lg border p-4"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium">
                                                Task #{task.id.substring(0, 8)}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    {task.technician?.name ||
                                                        'Unassigned'}
                                                </span>
                                                {task.scheduled_date && (
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(
                                                            task.scheduled_date,
                                                        ).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Link
                                            href={
                                                admin.tasks.show({
                                                    task: task.id,
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
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

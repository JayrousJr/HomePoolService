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
import { type Task } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Edit,
    FileText,
    Trash2,
    User,
    XCircle,
} from 'lucide-react';

interface TaskShowProps {
    task: Task & {
        serviceRequest?: {
            id: string;
            name: string;
            service: string;
            description: string;
        };
        technician?: { id: string; name: string; email: string };
        assigned_tasks?: Array<{ id: string; status: string }>;
    };
    is_manager: boolean;
}

const getStatusVariant = (
    status: Task['status'],
): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
        case 'completed':
            return 'default';
        case 'in_progress':
            return 'secondary';
        case 'cancelled':
            return 'destructive';
        case 'pending':
        default:
            return 'outline';
    }
};

const getStatusIcon = (status: Task['status']) => {
    switch (status) {
        case 'completed':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'in_progress':
            return <Clock className="h-5 w-5 text-blue-500" />;
        case 'cancelled':
            return <XCircle className="h-5 w-5 text-red-500" />;
        case 'pending':
        default:
            return <Clock className="h-5 w-5 text-yellow-500" />;
    }
};

export default function TaskShow({ task, is_manager }: TaskShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Tasks', href: admin.tasks.index().url },
        {
            title: `Task #${task.id.substring(0, 8)}`,
            href: admin.tasks.show({ task: task.id }).url,
        },
    ];

    const hasCompletedOrCancelledAssignment = task.assigned_tasks?.some(
        (at) => at.status === 'cancelled' || at.status === 'completed',
    );

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(admin.tasks.destroy({ task: task.id }).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Task #${task.id.substring(0, 8)}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={admin.tasks.index().url}>
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">
                                Task #{task.id.substring(0, 8)}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Task Details
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {is_manager && !hasCompletedOrCancelledAssignment && (
                            <>
                                <Link
                                    href={admin.tasks.edit({ task: task.id }).url}
                                >
                                    <Button variant="outline">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Task Information */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Task Information</CardTitle>
                            <CardDescription>
                                Current status and details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                {getStatusIcon(task.status)}
                                <div>
                                    <p className="text-sm font-medium">
                                        Status
                                    </p>
                                    <Badge
                                        variant={getStatusVariant(task.status)}
                                    >
                                        {task.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Scheduled Date
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {task.scheduled_date
                                            ? new Date(
                                                  task.scheduled_date,
                                              ).toLocaleDateString('en-US', {
                                                  weekday: 'long',
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                              })
                                            : 'Not scheduled'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Created At
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(
                                            task.created_at,
                                        ).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(
                                            task.created_at,
                                        ).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Assignment Details</CardTitle>
                            <CardDescription>
                                Technician and service information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Assigned Technician
                                    </p>
                                    {task.technician ? (
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                {task.technician.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {task.technician.email}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            Unassigned
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Service Request
                                    </p>
                                    {task.serviceRequest ? (
                                        <Link
                                            href={
                                                admin.serviceRequests.show({
                                                    serviceRequest:
                                                        task.serviceRequest.id,
                                                }).url
                                            }
                                            className="text-sm text-primary hover:underline"
                                        >
                                            {task.serviceRequest.name} -{' '}
                                            {task.serviceRequest.service}
                                        </Link>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No service request
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Service Request Details */}
                {task.serviceRequest && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Service Request Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Service Type
                                </p>
                                <Badge variant="outline">
                                    {task.serviceRequest.service}
                                </Badge>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Client Name
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {task.serviceRequest.name}
                                </p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Description
                                </p>
                                <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                                    {task.serviceRequest.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Comments */}
                {task.comments && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Comments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                                {task.comments}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type AssignedTask } from '@/types/models';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Cog,
    Notebook,
    User,
    XCircle,
    ZoomIn,
} from 'lucide-react';
import { useState } from 'react';

interface AssignedTaskShowProps {
    assignedTask: AssignedTask & {
        task?: {
            id: string;
            service_request?: {
                name: string;
                service: string;
                description: string;
                email: string;
                phone: string;
            };
            technician?: { name: string; email: string };
            scheduled_date?: string;
        };
    };
}

const getStatusVariant = (
    status: string,
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

const getStatusIcon = (status: string) => {
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

export default function AssignedTaskShow({
    assignedTask,
}: AssignedTaskShowProps) {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const [previewImage, setPreviewImage] = useState<{
        url: string;
        title: string;
    } | null>(null);

    // Check if user can edit (assigned technician or manager, but not cancelled tasks)
    const isManager = user?.roles?.some((role: string) =>
        ['Administrator', 'Manager'].includes(role),
    );
    const isTechnician = assignedTask.task?.technician?.email === user?.email;
    const canEdit =
        (isManager || isTechnician) && assignedTask.status !== 'cancelled';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Assigned Tasks',
            href: admin.assignedTasks.index().url,
        },
        {
            title: `Task #${assignedTask.id.substring(0, 8)}`,
            href: admin.assignedTasks.show({ assigned_task: assignedTask.id })
                .url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Assigned Task #${assignedTask.id.substring(0, 8)}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={admin.assignedTasks.index().url}>
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">
                                Assigned Task #{assignedTask.id.substring(0, 8)}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Task details and progress
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {canEdit && assignedTask.status !== 'completed' && (
                            <Link
                                href={
                                    admin.assignedTasks.edit({
                                        assigned_task: assignedTask.id,
                                    }).url
                                }
                            >
                                <Button>
                                    <Cog className="mr-2 h-4 w-4" />
                                    Process Task
                                </Button>
                            </Link>
                        )}
                        {isManager &&
                            assignedTask.status === 'cancelled' &&
                            assignedTask.task?.id && (
                                <Link
                                    href={
                                        admin.tasks.edit({
                                            task: assignedTask.task.id,
                                        }).url
                                    }
                                >
                                    <Button variant="outline">
                                        <User className="mr-2 h-4 w-4" />
                                        Reassign Task
                                    </Button>
                                </Link>
                            )}
                    </div>
                </div>

                {/* Task Status and Info */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Task Status</CardTitle>
                            <CardDescription>
                                Current progress and timeline
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                {getStatusIcon(assignedTask.status)}
                                <div>
                                    <p className="text-sm font-medium">
                                        Status
                                    </p>
                                    <Badge
                                        variant={getStatusVariant(
                                            assignedTask.status,
                                        )}
                                    >
                                        {assignedTask.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                            </div>
                            {assignedTask.task?.comments && (
                                <div className="flex items-start gap-3">
                                    <Notebook className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            comments of the Task
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {assignedTask.task.comments}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {assignedTask.started_at && (
                                <div className="flex items-start gap-3">
                                    <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Started At
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(
                                                assignedTask.started_at,
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {assignedTask.completed_at && (
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Completed At
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(
                                                assignedTask.completed_at,
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Assignment Details</CardTitle>
                            <CardDescription>
                                Technician and schedule
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Assigned Technician
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {assignedTask.task?.technician?.name ||
                                            'Unassigned'}
                                    </p>
                                    {assignedTask.task?.technician?.email && (
                                        <p className="text-xs text-muted-foreground">
                                            {assignedTask.task.technician.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {assignedTask.task?.scheduled_date && (
                                <div className="flex items-start gap-3">
                                    <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            Scheduled Date
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(
                                                assignedTask.task.scheduled_date,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Service Request Details */}
                {assignedTask.task?.service_request && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Service Request Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium">
                                        Client Name
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {assignedTask.task.service_request.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Service Type
                                    </p>
                                    <Badge variant="outline">
                                        {
                                            assignedTask.task.service_request
                                                .service
                                        }
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">
                                        {
                                            assignedTask.task.service_request
                                                .email
                                        }
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <p className="text-sm text-muted-foreground">
                                        {
                                            assignedTask.task.service_request
                                                .phone
                                        }
                                    </p>
                                </div>
                            </div>
                            {assignedTask.task.service_request.description && (
                                <div>
                                    <p className="mb-1 text-sm font-medium">
                                        Description
                                    </p>
                                    <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                                        {
                                            assignedTask.task.service_request
                                                .description
                                        }
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Feedback */}
                {assignedTask.feedback && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Technician Feedback</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                                {assignedTask.feedback}
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Images */}
                {(assignedTask.image_before || assignedTask.image_after) && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Task Images</CardTitle>
                            <CardDescription>
                                Before and after photos
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                {assignedTask.image_before && (
                                    <div>
                                        <p className="mb-2 text-sm font-medium">
                                            Before
                                        </p>
                                        <div
                                            className="group relative cursor-pointer"
                                            onClick={() =>
                                                setPreviewImage({
                                                    url: `/storage/${assignedTask.image_before}`,
                                                    title: 'Before Image',
                                                })
                                            }
                                        >
                                            <img
                                                src={`/storage/${assignedTask.image_before}`}
                                                alt="Before"
                                                className="h-auto w-full rounded-md border"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                <ZoomIn className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {assignedTask.image_after && (
                                    <div>
                                        <p className="mb-2 text-sm font-medium">
                                            After
                                        </p>
                                        <div
                                            className="group relative cursor-pointer"
                                            onClick={() =>
                                                setPreviewImage({
                                                    url: `/storage/${assignedTask.image_after}`,
                                                    title: 'After Image',
                                                })
                                            }
                                        >
                                            <img
                                                src={`/storage/${assignedTask.image_after}`}
                                                alt="After"
                                                className="h-auto w-full rounded-md border"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                <ZoomIn className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Image Preview Dialog */}
            <Dialog
                open={!!previewImage}
                onOpenChange={() => setPreviewImage(null)}
            >
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>{previewImage?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="relative w-full">
                        {previewImage && (
                            <img
                                src={previewImage.url}
                                alt={previewImage.title}
                                className="h-auto max-h-[80vh] w-full rounded-md object-contain"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type ServiceRequest, type User } from '@/types/models';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface TaskCreateProps {
    service_requests: ServiceRequest[];
    technicians: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: admin.tasks.index().url,
    },
    {
        title: 'Create Task',
        href: admin.tasks.create().url,
    },
];

export default function TaskCreate({
    service_requests,
    technicians,
}: TaskCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        service_request_id: '',
        user_id: '',
        status: 'pending',
        scheduled_date: '',
        comments: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.tasks.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Task" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={admin.tasks.index().url}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Create Task</h1>
                        <p className="text-sm text-muted-foreground">
                            Assign a new task to a technician
                        </p>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Task Details</CardTitle>
                        <CardDescription>
                            Fill in the information to create a new task
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Service Request */}
                            <div className="space-y-2">
                                <Label htmlFor="service_request_id">
                                    Service Request *
                                </Label>
                                <Select
                                    value={data.service_request_id}
                                    onValueChange={(value) =>
                                        setData('service_request_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a service request" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {service_requests.map((request) => (
                                            <SelectItem
                                                key={request.id}
                                                value={request.id}
                                            >
                                                {request.name} -{' '}
                                                {request.service}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.service_request_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.service_request_id}
                                    </p>
                                )}
                            </div>

                            {/* Technician */}
                            <div className="space-y-2">
                                <Label htmlFor="user_id">
                                    Assign to Technician *
                                </Label>
                                <Select
                                    value={data.user_id}
                                    onValueChange={(value) =>
                                        setData('user_id', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a technician" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {technicians.map((tech) => (
                                            <SelectItem
                                                key={tech.id}
                                                value={tech.id}
                                            >
                                                {tech.name} - {tech.email}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.user_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.user_id}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="status">Status *</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData('status', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="in_progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                        <SelectItem value="cancelled">
                                            Cancelled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-destructive">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            {/* Scheduled Date */}
                            <div className="space-y-2">
                                <Label htmlFor="scheduled_date">
                                    Scheduled Date
                                </Label>
                                <Input
                                    id="scheduled_date"
                                    type="date"
                                    value={data.scheduled_date}
                                    onChange={(e) =>
                                        setData(
                                            'scheduled_date',
                                            e.target.value,
                                        )
                                    }
                                />
                                {errors.scheduled_date && (
                                    <p className="text-sm text-destructive">
                                        {errors.scheduled_date}
                                    </p>
                                )}
                            </div>

                            {/* Comments */}
                            <div className="space-y-2">
                                <Label htmlFor="comments">Comments</Label>
                                <Textarea
                                    id="comments"
                                    placeholder="Add any additional notes or instructions..."
                                    value={data.comments}
                                    onChange={(e) =>
                                        setData('comments', e.target.value)
                                    }
                                    rows={4}
                                />
                                {errors.comments && (
                                    <p className="text-sm text-destructive">
                                        {errors.comments}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-4">
                                <Link href={admin.tasks.index().url}>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Task'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

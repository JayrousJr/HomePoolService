import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type ServiceRequest } from '@/types/models';
import { Head, useForm } from '@inertiajs/react';

interface AssignedTaskCreateProps {
    serviceRequests: ServiceRequest[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Assigned Tasks',
        href: admin.assignedTasks.index().url,
    },
    {
        title: 'Assign Task',
    },
];

export default function AssignedTaskCreate({ serviceRequests }: AssignedTaskCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        service_request_id: '',
        status: 'pending',
        scheduled_date: '',
        comments: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.assignedTasks.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assign Task" />

            <Card>
                <CardHeader>
                    <CardTitle>Assign New Task</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="service_request_id">Service Request *</Label>
                                <Select
                                    value={data.service_request_id}
                                    onValueChange={(value) => setData('service_request_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select service request" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {serviceRequests.map((request) => (
                                            <SelectItem key={request.id} value={request.id.toString()}>
                                                {request.name} - {request.service}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.service_request_id && (
                                    <p className="text-sm text-destructive">{errors.service_request_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status *</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) => setData('status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-destructive">{errors.status}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="scheduled_date">Scheduled Date</Label>
                                <Input
                                    id="scheduled_date"
                                    type="datetime-local"
                                    value={data.scheduled_date}
                                    onChange={(e) => setData('scheduled_date', e.target.value)}
                                />
                                {errors.scheduled_date && (
                                    <p className="text-sm text-destructive">{errors.scheduled_date}</p>
                                )}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="comments">Comments</Label>
                                <Textarea
                                    id="comments"
                                    value={data.comments}
                                    onChange={(e) => setData('comments', e.target.value)}
                                    rows={4}
                                />
                                {errors.comments && (
                                    <p className="text-sm text-destructive">{errors.comments}</p>
                                )}
                            </div>
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
                                Assign Task
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

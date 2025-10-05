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
import { type AssignedTask } from '@/types/models';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload, ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface AssignedTaskEditProps {
    assignedTask: AssignedTask & {
        task?: {
            id: string;
            service_request?: {
                name: string;
                service: string;
                description: string;
            };
            technician?: { name: string };
            scheduled_date?: string;
        };
    };
}

export default function AssignedTaskEdit({
    assignedTask,
}: AssignedTaskEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Assigned Tasks',
            href: admin.assignedTasks.index().url,
        },
        {
            title: 'Update Task',
            href: admin.assignedTasks.edit({ assigned_task: assignedTask.id })
                .url,
        },
    ];

    const [imageBeforePreview, setImageBeforePreview] = useState<string | null>(
        assignedTask.image_before || null,
    );
    const [imageAfterPreview, setImageAfterPreview] = useState<string | null>(
        assignedTask.image_after || null,
    );
    const [previewImage, setPreviewImage] = useState<{
        url: string;
        title: string;
    } | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        status: assignedTask.status || 'pending',
        feedback: assignedTask.feedback || '',
        image_before: null as File | null,
        image_after: null as File | null,
        _method: 'PUT',
    });

    const handleImageChange = (
        field: 'image_before' | 'image_after',
        file: File | null,
    ) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (field === 'image_before') {
                    setImageBeforePreview(reader.result as string);
                } else {
                    setImageAfterPreview(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
            setData(field, file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(
            admin.assignedTasks.update({ assigned_task: assignedTask.id }).url,
            {
                forceFormData: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Assigned Task" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={admin.assignedTasks.index().url}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Update Task Progress
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Update status and provide feedback
                        </p>
                    </div>
                </div>

                {/* Service Request Info */}
                {assignedTask.task?.service_request && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Service Request Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <span className="text-sm font-medium">
                                    Client:{' '}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {assignedTask.task.service_request.name}
                                </span>
                            </div>
                            <div>
                                <span className="text-sm font-medium">
                                    Service:{' '}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {assignedTask.task.service_request.service}
                                </span>
                            </div>
                            <div>
                                <span className="text-sm font-medium">
                                    Description:{' '}
                                </span>
                                <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                                    {
                                        assignedTask.task.service_request
                                            .description
                                    }
                                </p>
                            </div>
                            {assignedTask.task.scheduled_date && (
                                <div>
                                    <span className="text-sm font-medium">
                                        Scheduled:{' '}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {new Date(
                                            assignedTask.task.scheduled_date,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Task Progress</CardTitle>
                        <CardDescription>
                            Update the task status and provide feedback
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
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

                            {/* Feedback */}
                            <div className="space-y-2">
                                <Label htmlFor="feedback">Feedback</Label>
                                <Textarea
                                    id="feedback"
                                    placeholder="Describe the work performed, issues encountered, or any notes..."
                                    value={data.feedback}
                                    onChange={(e) =>
                                        setData('feedback', e.target.value)
                                    }
                                    rows={6}
                                />
                                {errors.feedback && (
                                    <p className="text-sm text-destructive">
                                        {errors.feedback}
                                    </p>
                                )}
                            </div>

                            {/* Image Before */}
                            <div className="space-y-2">
                                <Label htmlFor="image_before">
                                    Before Image
                                </Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="image_before"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageChange(
                                                'image_before',
                                                e.target.files?.[0] || null,
                                            )
                                        }
                                        className="cursor-pointer"
                                    />
                                    {imageBeforePreview && (
                                        <div className="group relative">
                                            <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                                                <img
                                                    src={
                                                        imageBeforePreview.startsWith(
                                                            'blob:',
                                                        ) ||
                                                        imageBeforePreview.startsWith(
                                                            'data:',
                                                        )
                                                            ? imageBeforePreview
                                                            : `/storage/${imageBeforePreview}`
                                                    }
                                                    alt="Before preview"
                                                    className="h-full w-full rounded-md object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-white hover:bg-white/20 hover:text-white"
                                                        onClick={() =>
                                                            setPreviewImage({
                                                                url:
                                                                    imageBeforePreview.startsWith(
                                                                        'blob:',
                                                                    ) ||
                                                                    imageBeforePreview.startsWith(
                                                                        'data:',
                                                                    )
                                                                        ? imageBeforePreview
                                                                        : `/storage/${imageBeforePreview}`,
                                                                title: 'Before Image',
                                                            })
                                                        }
                                                    >
                                                        <ZoomIn className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.image_before && (
                                    <p className="text-sm text-destructive">
                                        {errors.image_before}
                                    </p>
                                )}
                            </div>

                            {/* Image After */}
                            <div className="space-y-2">
                                <Label htmlFor="image_after">After Image</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="image_after"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageChange(
                                                'image_after',
                                                e.target.files?.[0] || null,
                                            )
                                        }
                                        className="cursor-pointer"
                                    />
                                    {imageAfterPreview && (
                                        <div className="group relative">
                                            <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                                                <img
                                                    src={
                                                        imageAfterPreview.startsWith(
                                                            'blob:',
                                                        ) ||
                                                        imageAfterPreview.startsWith(
                                                            'data:',
                                                        )
                                                            ? imageAfterPreview
                                                            : `/storage/${imageAfterPreview}`
                                                    }
                                                    alt="After preview"
                                                    className="h-full w-full rounded-md object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-white hover:bg-white/20 hover:text-white"
                                                        onClick={() =>
                                                            setPreviewImage({
                                                                url:
                                                                    imageAfterPreview.startsWith(
                                                                        'blob:',
                                                                    ) ||
                                                                    imageAfterPreview.startsWith(
                                                                        'data:',
                                                                    )
                                                                        ? imageAfterPreview
                                                                        : `/storage/${imageAfterPreview}`,
                                                                title: 'After Image',
                                                            })
                                                        }
                                                    >
                                                        <ZoomIn className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.image_after && (
                                    <p className="text-sm text-destructive">
                                        {errors.image_after}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-4">
                                <Link href={admin.assignedTasks.index().url}>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    {processing ? 'Updating...' : 'Update Task'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
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

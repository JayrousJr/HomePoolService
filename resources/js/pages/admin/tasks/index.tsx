import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Task, type PaginatedData } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';

interface TasksIndexProps {
    tasks: PaginatedData<Task>;
    is_manager: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Tasks',
        href: admin.tasks.index().url,
    },
];

const getStatusVariant = (
    status: Task['status']
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

const getStatusColor = (status: Task['status']): string => {
    switch (status) {
        case 'completed':
            return 'text-green-600';
        case 'in_progress':
            return 'text-blue-600';
        case 'cancelled':
            return 'text-red-600';
        case 'pending':
        default:
            return 'text-yellow-600';
    }
};

export default function TasksIndex({ tasks, is_manager }: TasksIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(admin.tasks.destroy({ task: id }).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                        <p className="text-muted-foreground">
                            {is_manager
                                ? 'Manage all tasks assigned to technicians'
                                : 'View and update your assigned tasks'}
                        </p>
                    </div>
                    {is_manager && (
                        <Link href={admin.tasks.create().url}>
                            <Button>
                                <Plus className="h-4 w-4" />
                                Create Task
                            </Button>
                        </Link>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Tasks ({tasks.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Service Request
                                        </th>
                                        {is_manager && (
                                            <th className="px-4 py-3 text-left text-sm font-medium">
                                                Technician
                                            </th>
                                        )}
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Scheduled Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Comments
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
                                    {tasks.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={is_manager ? 7 : 6}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No tasks found
                                            </td>
                                        </tr>
                                    ) : (
                                        tasks.data.map((task) => (
                                            <tr
                                                key={task.id}
                                                className="border-b hover:bg-accent/50 transition-colors"
                                            >
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {task.service_request?.name || 'N/A'}
                                                    <div className="text-xs text-muted-foreground">
                                                        {task.service_request?.service}
                                                    </div>
                                                </td>
                                                {is_manager && (
                                                    <td className="px-4 py-3 text-sm">
                                                        {task.technician?.name || 'Unassigned'}
                                                    </td>
                                                )}
                                                <td className="px-4 py-3">
                                                    <Badge variant={getStatusVariant(task.status)}>
                                                        {task.status.replace('_', ' ')}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {task.scheduled_date
                                                        ? new Date(
                                                              task.scheduled_date
                                                          ).toLocaleDateString()
                                                        : 'Not scheduled'}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <div
                                                        className={`max-w-xs truncate ${getStatusColor(task.status)}`}
                                                    >
                                                        {task.comments || 'No comments'}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {new Date(
                                                        task.created_at
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={
                                                                admin.tasks.show({
                                                                    task: task.id,
                                                                }).url
                                                            }
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link
                                                            href={
                                                                admin.tasks.edit({
                                                                    task: task.id,
                                                                }).url
                                                            }
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        {is_manager && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleDelete(task.id)
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {tasks.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {tasks.from} to {tasks.to} of {tasks.total}{' '}
                                    results
                                </div>
                                <div className="flex gap-2">
                                    {tasks.links.map((link, index) => {
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
                                                        link.active ? 'default' : 'outline'
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

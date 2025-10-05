import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type AssignedTask, type PaginatedData } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Cog, Eye, Trash2 } from 'lucide-react';

interface AssignedTasksIndexProps {
    assignedTasks: PaginatedData<AssignedTask>;
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
];

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

interface AssignedTasksIndexProps {
    assignedTasks: PaginatedData<
        AssignedTask & {
            task?: {
                id: string;
                service_request?: { name: string; service: string };
                technician?: { name: string };
                scheduled_date?: string;
            };
        }
    >;
    is_technician: boolean;
}

export default function AssignedTasksIndex({
    assignedTasks,
    is_technician = false,
}: AssignedTasksIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this assigned task?')) {
            router.delete(
                admin.assignedTasks.destroy({ assigned_task: id }).url,
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Assigned Tasks" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {is_technician
                                ? 'My Assigned Tasks'
                                : 'Assigned Tasks'}
                        </h1>
                        <p className="text-muted-foreground">
                            {is_technician
                                ? 'View and update your assigned tasks'
                                : 'Manage tasks assigned to technicians'}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            All Assigned Tasks ({assignedTasks.total})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Service Request
                                        </th>
                                        {!is_technician && (
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
                                            Completed
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignedTasks.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={is_technician ? 5 : 6}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No assigned tasks found
                                            </td>
                                        </tr>
                                    ) : (
                                        assignedTasks.data.map(
                                            (assignedTask) => (
                                                <tr
                                                    key={assignedTask.id}
                                                    className="border-b transition-colors hover:bg-accent/50"
                                                >
                                                    <td className="px-4 py-3 text-sm font-medium">
                                                        {assignedTask.task
                                                            ?.service_request
                                                            ?.name || 'N/A'}
                                                        <div className="text-xs text-muted-foreground">
                                                            {
                                                                assignedTask
                                                                    .task
                                                                    ?.service_request
                                                                    ?.service
                                                            }
                                                        </div>
                                                    </td>
                                                    {!is_technician && (
                                                        <td className="px-4 py-3 text-sm">
                                                            {assignedTask.task
                                                                ?.technician
                                                                ?.name ||
                                                                'Unassigned'}
                                                        </td>
                                                    )}
                                                    <td className="px-4 py-3">
                                                        <Badge
                                                            variant={getStatusVariant(
                                                                assignedTask.status,
                                                            )}
                                                        >
                                                            {assignedTask.status.replace(
                                                                '_',
                                                                ' ',
                                                            )}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                                        {assignedTask.task
                                                            ?.scheduled_date
                                                            ? new Date(
                                                                  assignedTask.task.scheduled_date,
                                                              ).toLocaleDateString()
                                                            : 'Not scheduled'}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                                        {assignedTask.completed_at
                                                            ? new Date(
                                                                  assignedTask.completed_at,
                                                              ).toLocaleDateString()
                                                            : '-'}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                href={
                                                                    admin.assignedTasks.show(
                                                                        {
                                                                            assigned_task:
                                                                                assignedTask.id,
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
                                                            {is_technician &&
                                                                assignedTask.status !==
                                                                    'completed' &&
                                                                assignedTask.status !==
                                                                    'cancelled' && (
                                                                    <Link
                                                                        href={
                                                                            admin.assignedTasks.edit(
                                                                                {
                                                                                    assigned_task:
                                                                                        assignedTask.id,
                                                                                },
                                                                            )
                                                                                .url
                                                                        }
                                                                    >
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                        >
                                                                            <Cog className="h-4 w-4" />
                                                                        </Button>
                                                                    </Link>
                                                                )}
                                                            {!is_technician &&
                                                                assignedTask.status !==
                                                                    'completed' && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                assignedTask.id,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                                    </Button>
                                                                )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {assignedTasks.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {assignedTasks.from} to{' '}
                                    {assignedTasks.to} of {assignedTasks.total}{' '}
                                    results
                                </div>
                                <div className="flex gap-2">
                                    {assignedTasks.links.map((link, index) => {
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

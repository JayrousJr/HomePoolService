import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { type AssignedTask } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { CheckSquare, ClipboardList, Clock } from 'lucide-react';

interface DashboardProps {
    stats?: any;
    is_technician?: boolean;
    recent_tasks?: AssignedTask[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ stats, is_technician = false, recent_tasks = [] }: DashboardProps) {
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'completed': return 'default';
            case 'in_progress': return 'secondary';
            case 'cancelled': return 'destructive';
            default: return 'outline';
        }
    };

    if (is_technician) {
        // Technician dashboard with task stats
        const technicianStatsCards = [
            {
                title: 'Total Tasks',
                value: stats?.total_assigned_tasks || 0,
                icon: CheckSquare,
                description: 'Tasks assigned to you',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50 dark:bg-blue-950',
            },
            {
                title: 'Pending',
                value: stats?.pending_tasks || 0,
                icon: Clock,
                description: 'Tasks waiting to start',
                color: 'text-orange-600',
                bgColor: 'bg-orange-50 dark:bg-orange-950',
            },
            {
                title: 'In Progress',
                value: stats?.in_progress_tasks || 0,
                icon: ClipboardList,
                description: 'Currently working on',
                color: 'text-purple-600',
                bgColor: 'bg-purple-50 dark:bg-purple-950',
            },
            {
                title: 'Completed',
                value: stats?.completed_tasks || 0,
                icon: CheckSquare,
                description: 'Tasks finished',
                color: 'text-green-600',
                bgColor: 'bg-green-50 dark:bg-green-950',
            },
        ];

        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
                        <p className="text-muted-foreground">Overview of your assigned tasks</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {technicianStatsCards.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={stat.title} className="overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                        <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                                            <Icon className={`h-5 w-5 ${stat.color}`} />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recent_tasks.length > 0 ? (
                                <div className="space-y-3">
                                    {recent_tasks.map((task: any) => (
                                        <Link
                                            key={task.id}
                                            href={admin.assignedTasks.show({ assigned_task: task.id }).url}
                                            className="block rounded-lg border p-3 transition-colors hover:bg-accent"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <p className="font-medium">
                                                        {task.task?.service_request?.service || 'Task'}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {task.task?.service_request?.name || 'No client'}
                                                    </p>
                                                </div>
                                                <Badge variant={getStatusVariant(task.status)}>
                                                    {task.status.replace('_', ' ')}
                                                </Badge>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-sm text-muted-foreground py-4">
                                    No tasks assigned yet
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    // Regular user dashboard with placeholder
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}

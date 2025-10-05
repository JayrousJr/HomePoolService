import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type AssignedTask, type DashboardStats } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    CheckSquare,
    ClipboardList,
    Clock,
    Mail,
    Users,
} from 'lucide-react';

interface AdminDashboardProps {
    stats: DashboardStats;
    is_technician?: boolean;
    recent_tasks?: AssignedTask[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: admin.dashboard().url,
    },
];

export default function AdminDashboard({ stats, is_technician = false, recent_tasks = [] }: AdminDashboardProps) {
    // Technician stats cards
    const technicianStatsCards = [
        {
            title: 'Total Tasks',
            value: stats.total_assigned_tasks || 0,
            icon: CheckSquare,
            description: 'Tasks assigned to you',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
        },
        {
            title: 'Pending',
            value: stats.pending_tasks || 0,
            icon: Clock,
            description: 'Tasks waiting to start',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-950',
        },
        {
            title: 'In Progress',
            value: stats.in_progress_tasks || 0,
            icon: ClipboardList,
            description: 'Currently working on',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-950',
        },
        {
            title: 'Completed',
            value: stats.completed_tasks || 0,
            icon: CheckSquare,
            description: 'Tasks finished',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-950',
        },
    ];

    // Manager stats cards
    const managerStatsCards = [
        {
            title: 'Total Users',
            value: stats.total_users,
            icon: Users,
            description: 'Registered users in the system',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
        },
        {
            title: 'Total Clients',
            value: stats.total_clients,
            icon: Building2,
            description: 'Active clients',
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-950',
        },
        {
            title: 'Service Requests',
            value: stats.total_service_requests,
            icon: ClipboardList,
            description: 'Total service requests',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-950',
        },
        {
            title: 'Total Tasks',
            value: stats.total_tasks,
            icon: CheckSquare,
            description: 'Tasks assigned to technicians',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-950',
        },
        {
            title: 'Total Messages',
            value: stats.total_messages,
            icon: Mail,
            description: 'Contact form submissions',
            color: 'text-pink-600',
            bgColor: 'bg-pink-50 dark:bg-pink-950',
        },
    ];

    const statsCards = is_technician ? technicianStatsCards : managerStatsCards;

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'completed': return 'default';
            case 'in_progress': return 'secondary';
            case 'cancelled': return 'destructive';
            default: return 'outline';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={is_technician ? "Dashboard" : "Admin Dashboard"} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {is_technician ? "My Dashboard" : "Admin Dashboard"}
                    </h1>
                    <p className="text-muted-foreground">
                        {is_technician
                            ? "Overview of your assigned tasks"
                            : "Overview of your pool service management system"
                        }
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statsCards.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.title} className="overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <div
                                        className={`rounded-lg p-2 ${stat.bgColor}`}
                                    >
                                        <Icon
                                            className={`h-5 w-5 ${stat.color}`}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stat.value}
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {is_technician ? (
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
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <a
                                        href={admin.clients.index().url}
                                        className="block rounded-lg p-3 transition-colors hover:bg-accent"
                                    >
                                        <div className="font-medium">
                                            Manage Clients
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            View and manage client accounts
                                        </p>
                                    </a>
                                    <a
                                        href={admin.serviceRequests.index().url}
                                        className="block rounded-lg p-3 transition-colors hover:bg-accent"
                                    >
                                        <div className="font-medium">
                                            Service Requests
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Review and assign service requests
                                        </p>
                                    </a>
                                    <a
                                        href={admin.tasks.index().url}
                                        className="block rounded-lg p-3 transition-colors hover:bg-accent"
                                    >
                                        <div className="font-medium">
                                            Manage Tasks
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            View and update task status
                                        </p>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>System Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between border-b py-2">
                                        <span className="text-sm text-muted-foreground">
                                            Active Clients
                                        </span>
                                        <span className="font-medium">
                                            {stats.total_clients}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between border-b py-2">
                                        <span className="text-sm text-muted-foreground">
                                            Pending Requests
                                        </span>
                                        <span className="font-medium">
                                            {stats.total_service_requests}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between border-b py-2">
                                        <span className="text-sm text-muted-foreground">
                                            Active Tasks
                                        </span>
                                        <span className="font-medium">
                                            {stats.total_tasks}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm text-muted-foreground">
                                            Unread Messages
                                        </span>
                                        <span className="font-medium">
                                            {stats.total_messages}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

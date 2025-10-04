import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type DashboardStats } from '@/types/models';
import { Head } from '@inertiajs/react';
import { Users, Building2, ClipboardList, CheckSquare, Mail } from 'lucide-react';

interface AdminDashboardProps {
    stats: DashboardStats;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
];

export default function AdminDashboard({ stats }: AdminDashboardProps) {
    const statsCards = [
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                        Overview of your pool service management system
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {statsCards.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.title} className="overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                                        <Icon className={`h-5 w-5 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <a
                                    href={admin.clients.index().url}
                                    className="block p-3 rounded-lg hover:bg-accent transition-colors"
                                >
                                    <div className="font-medium">Manage Clients</div>
                                    <p className="text-sm text-muted-foreground">
                                        View and manage client accounts
                                    </p>
                                </a>
                                <a
                                    href={admin.serviceRequests.index().url}
                                    className="block p-3 rounded-lg hover:bg-accent transition-colors"
                                >
                                    <div className="font-medium">Service Requests</div>
                                    <p className="text-sm text-muted-foreground">
                                        Review and assign service requests
                                    </p>
                                </a>
                                <a
                                    href={admin.tasks.index().url}
                                    className="block p-3 rounded-lg hover:bg-accent transition-colors"
                                >
                                    <div className="font-medium">Manage Tasks</div>
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
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-sm text-muted-foreground">
                                        Active Clients
                                    </span>
                                    <span className="font-medium">{stats.total_clients}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-sm text-muted-foreground">
                                        Pending Requests
                                    </span>
                                    <span className="font-medium">
                                        {stats.total_service_requests}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-sm text-muted-foreground">
                                        Active Tasks
                                    </span>
                                    <span className="font-medium">{stats.total_tasks}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-muted-foreground">
                                        Unread Messages
                                    </span>
                                    <span className="font-medium">{stats.total_messages}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

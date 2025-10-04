import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Visitor, type PaginatedData } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2, Activity, Globe } from 'lucide-react';

interface VisitorsIndexProps {
    visitors: PaginatedData<Visitor>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Visitors',
        href: admin.visitors.index().url,
    },
];

export default function VisitorsIndex({ visitors }: VisitorsIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this visitor record?')) {
            router.delete(admin.visitors.destroy({ visitor: id }).url);
        }
    };

    const getActivityBadge = (count: number) => {
        if (count > 50) return { variant: 'destructive' as const, label: 'High' };
        if (count > 20) return { variant: 'secondary' as const, label: 'Medium' };
        return { variant: 'outline' as const, label: 'Low' };
    };

    const totalRequests = visitors.data.reduce(
        (sum, visitor) => sum + visitor.request_count,
        0
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Visitors Analytics" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Visitors Analytics
                        </h1>
                        <p className="text-muted-foreground">
                            Track and monitor website visitor activity
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Visitors
                            </CardTitle>
                            <Globe className="h-5 w-5 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{visitors.total}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Unique IP addresses
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Requests
                            </CardTitle>
                            <Activity className="h-5 w-5 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalRequests}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                All page requests
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Average Requests
                            </CardTitle>
                            <Activity className="h-5 w-5 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {visitors.total > 0
                                    ? (totalRequests / visitors.total).toFixed(1)
                                    : 0}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Per visitor
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Visitor Activity ({visitors.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            IP Address
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Request Count
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Activity Level
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            User Agent
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Last Visited
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            First Visit
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visitors.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No visitor data found
                                            </td>
                                        </tr>
                                    ) : (
                                        visitors.data.map((visitor) => {
                                            const activity = getActivityBadge(
                                                visitor.request_count
                                            );
                                            return (
                                                <tr
                                                    key={visitor.id}
                                                    className="border-b hover:bg-accent/50 transition-colors"
                                                >
                                                    <td className="px-4 py-3 text-sm font-mono font-medium">
                                                        {visitor.ip_address}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <span className="font-semibold">
                                                            {visitor.request_count}
                                                        </span>{' '}
                                                        <span className="text-muted-foreground">
                                                            requests
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant={activity.variant}>
                                                            {activity.label}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                                        <div className="max-w-xs truncate">
                                                            {visitor.user_agent || 'Unknown'}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                                        {new Date(
                                                            visitor.last_visited_at
                                                        ).toLocaleDateString()}
                                                        <div className="text-xs">
                                                            {new Date(
                                                                visitor.last_visited_at
                                                            ).toLocaleTimeString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                                        {new Date(
                                                            visitor.created_at
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                href={
                                                                    admin.visitors.show({
                                                                        visitor: visitor.id,
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
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleDelete(visitor.id)
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {visitors.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {visitors.from} to {visitors.to} of{' '}
                                    {visitors.total} results
                                </div>
                                <div className="flex gap-2">
                                    {visitors.links.map((link, index) => {
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

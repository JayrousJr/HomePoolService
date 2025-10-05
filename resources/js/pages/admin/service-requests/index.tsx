import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData, type ServiceRequest } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, UserPlus } from 'lucide-react';

interface ServiceRequestsIndexProps {
    service_requests: PaginatedData<ServiceRequest>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Service Requests',
        href: admin.serviceRequests.index().url,
    },
];

export default function ServiceRequestsIndex({
    service_requests,
}: ServiceRequestsIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service request?')) {
            router.delete(
                admin.serviceRequests.destroy({ service_request: id }).url,
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Service Requests" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Service Requests
                        </h1>
                        <p className="text-muted-foreground">
                            Review and manage incoming service requests
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            All Service Requests ({service_requests.total})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Email
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Phone
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Service
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Status
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
                                    {service_requests.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No service requests found
                                            </td>
                                        </tr>
                                    ) : (
                                        service_requests.data.map((request) => (
                                            <tr
                                                key={request.id}
                                                className="border-b transition-colors hover:bg-accent/50"
                                            >
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {request.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {request.email}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {request.phone}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {request.service}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant={
                                                            request.assigned
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {request.assigned ? (
                                                            <span className="flex items-center gap-1">
                                                                <UserPlus className="h-3 w-3" />
                                                                Assigned
                                                            </span>
                                                        ) : (
                                                            'Unassigned'
                                                        )}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {new Date(
                                                        request.created_at,
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={
                                                                admin.serviceRequests.show(
                                                                    {
                                                                        service_request:
                                                                            request.id,
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
                                                        {/* <Link
                                                            href={
                                                                admin.serviceRequests.edit({
                                                                    service_request: request.id,
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
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(request.id)
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {service_requests.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {service_requests.from} to{' '}
                                    {service_requests.to} of{' '}
                                    {service_requests.total} results
                                </div>
                                <div className="flex gap-2">
                                    {service_requests.links.map(
                                        (link, index) => {
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
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                >
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
                                        },
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

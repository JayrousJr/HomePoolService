import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData, type User } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Ban, CheckCircle, Eye } from 'lucide-react';

interface UsersIndexProps {
    users: PaginatedData<User>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'User Management',
        href: admin.users.index().url,
    },
];

const getRoleBadgeVariant = (
    role: string,
): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (role) {
        case 'Manager':
            return 'default';
        case 'Technician':
            return 'secondary';
        default:
            return 'outline';
    }
};

export default function UsersIndex({ users }: UsersIndexProps) {
    const handleActivate = (userId: string) => {
        if (confirm('Are you sure you want to activate this user account?')) {
            router.post(`/admin/users/${userId}/activate`);
        }
    };

    const handleDeactivate = (userId: string) => {
        if (
            confirm(
                'Are you sure you want to deactivate this user account? They will not be able to log in.',
            )
        ) {
            router.post(`/admin/users/${userId}/deactivate`);
        }
    };

    const handleEndContract = (userId: string) => {
        if (
            confirm(
                'Are you sure you want to end this user contract? This will permanently deactivate their account and send a termination email.',
            )
        ) {
            router.post(`/admin/users/${userId}/end-contract`);
        }
    };

    const handleDelete = (userId: string) => {
        if (
            confirm(
                'Are you sure you want to delete this user? This action cannot be undone.',
            )
        ) {
            router.delete(admin.users.destroy({ user: userId }).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            User Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage technicians and staff members
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Users
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {users.total}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Active Users
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {users.data.filter((u) => u.active).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Inactive Users
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {users.data.filter((u) => !u.active).length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Users ({users.total})</CardTitle>
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
                                            Role
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Joined
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No users found
                                            </td>
                                        </tr>
                                    ) : (
                                        users.data.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-b transition-colors hover:bg-accent/50"
                                            >
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {user.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {user.email}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {user.roles &&
                                                        user.roles.map(
                                                            (role) => (
                                                                <Badge
                                                                    key={
                                                                        role.id
                                                                    }
                                                                    variant={getRoleBadgeVariant(
                                                                        role.name,
                                                                    )}
                                                                    className="mr-1"
                                                                >
                                                                    {role.name}
                                                                </Badge>
                                                            ),
                                                        )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant={
                                                            user.active
                                                                ? 'default'
                                                                : 'destructive'
                                                        }
                                                    >
                                                        {user.active ? (
                                                            <>
                                                                <CheckCircle className="mr-1 h-3 w-3" />
                                                                Active
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Ban className="mr-1 h-3 w-3" />
                                                                Inactive
                                                            </>
                                                        )}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {new Date(
                                                        user.created_at,
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={
                                                                admin.users.show(
                                                                    {
                                                                        user: user.id,
                                                                    },
                                                                ).url
                                                            }
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                title="View Details"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>

                                                        {/* {user.active ? (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleDeactivate(
                                                                        user.id,
                                                                    )
                                                                }
                                                                title="Deactivate User"
                                                                className="text-orange-600 hover:text-orange-700"
                                                            >
                                                                <PowerOff className="h-4 w-4" />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleActivate(
                                                                        user.id,
                                                                    )
                                                                }
                                                                title="Activate User"
                                                                className="text-green-600 hover:text-green-700"
                                                            >
                                                                <Power className="h-4 w-4" />
                                                            </Button>
                                                        )} */}

                                                        {/* <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleEndContract(
                                                                    user.id,
                                                                )
                                                            }
                                                            title="End Contract"
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <FileX className="h-4 w-4" />
                                                        </Button>

                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user.id,
                                                                )
                                                            }
                                                            title="Delete User"
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

                        {users.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {users.from} to {users.to} of{' '}
                                    {users.total} results
                                </div>
                                <div className="flex gap-2">
                                    {users.links.map((link, index) => {
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

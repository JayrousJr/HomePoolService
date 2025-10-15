import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type User } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Ban,
    CheckCircle,
    FileX,
    Mail,
    Power,
    PowerOff,
    Trash2,
    User as UserIcon,
} from 'lucide-react';

interface UserShowProps {
    user: User;
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
    {
        title: 'User Details',
        href: '',
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

export default function UserShow({ user }: UserShowProps) {
    const handleActivate = () => {
        if (confirm('Are you sure you want to activate this user account?')) {
            router.post(`/admin/users/${user.id}/activate`);
        }
    };

    const handleDeactivate = () => {
        if (
            confirm(
                'Are you sure you want to deactivate this user account? They will not be able to log in.',
            )
        ) {
            router.post(`/admin/users/${user.id}/deactivate`);
        }
    };

    const handleEndContract = () => {
        if (
            confirm(
                'Are you sure you want to end this user contract? This will permanently deactivate their account and send a termination email.',
            )
        ) {
            router.post(`/admin/users/${user.id}/end-contract`);
        }
    };

    const handleDelete = () => {
        if (
            confirm(
                'Are you sure you want to delete this user? This action cannot be undone.',
            )
        ) {
            router.delete(admin.users.destroy({ user: user.id }).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />
            <div className="flex h-full flex-1 flex-col flex-wrap gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                router.visit(admin.users.index().url)
                            }
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Users
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {user.name}
                            </h1>
                            <p className="text-muted-foreground">
                                User Details
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {user.active ? (
                            <Button
                                variant="outline"
                                onClick={handleDeactivate}
                                className="text-orange-600 hover:text-orange-700"
                            >
                                <PowerOff className="mr-2 h-4 w-4" />
                                Deactivate
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={handleActivate}
                                className="text-green-600 hover:text-green-700"
                            >
                                <Power className="mr-2 h-4 w-4" />
                                Activate
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            onClick={handleEndContract}
                            className="text-red-600 hover:text-red-700"
                        >
                            <FileX className="mr-2 h-4 w-4" />
                            End Contract
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* User Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserIcon className="h-5 w-5" />
                                User Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Name
                                </label>
                                <p className="text-lg font-semibold">
                                    {user.name}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Email
                                </label>
                                <p className="flex items-center gap-2 text-lg">
                                    <Mail className="h-4 w-4" />
                                    {user.email}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Role(s)
                                </label>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {user.roles &&
                                        user.roles.map((role) => (
                                            <Badge
                                                key={role.id}
                                                variant={getRoleBadgeVariant(
                                                    role.name,
                                                )}
                                            >
                                                {role.name}
                                            </Badge>
                                        ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Account Status
                                </label>
                                <div className="mt-1">
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
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Email Verified
                                </label>
                                <div className="mt-1">
                                    <Badge
                                        variant={
                                            user.email_verified_at
                                                ? 'default'
                                                : 'outline'
                                        }
                                    >
                                        {user.email_verified_at
                                            ? 'Verified'
                                            : 'Not Verified'}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Dates */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Dates</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Joined
                                </label>
                                <p className="text-lg">
                                    {new Date(user.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Last Updated
                                </label>
                                <p className="text-lg">
                                    {new Date(user.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {user.email_verified_at && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Email Verified At
                                    </label>
                                    <p className="text-lg">
                                        {new Date(
                                            user.email_verified_at,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Popup, type PaginatedData } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';

interface PopupsIndexProps {
    popups: PaginatedData<Popup>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Popups',
        href: admin.popups.index().url,
    },
];

export default function PopupsIndex({ popups }: PopupsIndexProps) {
    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this popup?')) {
            router.delete(admin.popups.destroy({ popup: id }).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Popups" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Popups</h1>
                        <p className="text-muted-foreground">
                            Manage website popups and notifications
                        </p>
                    </div>
                    <Link href={admin.popups.create().url}>
                        <Button>
                            <Plus className="h-4 w-4" />
                            Add Popup
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Popups ({popups.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Content</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Start Date</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">End Date</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {popups.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                                                No popups found
                                            </td>
                                        </tr>
                                    ) : (
                                        popups.data.map((popup) => (
                                            <tr key={popup.id} className="border-b hover:bg-accent/50 transition-colors">
                                                <td className="px-4 py-3 text-sm font-medium">{popup.title}</td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {popup.content.substring(0, 50)}
                                                    {popup.content.length > 50 && '...'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant={popup.active ? 'default' : 'secondary'}>
                                                        {popup.active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {popup.start_date ? new Date(popup.start_date).toLocaleDateString() : '-'}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {popup.end_date ? new Date(popup.end_date).toLocaleDateString() : '-'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={admin.popups.show({ popup: popup.id }).url}>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={admin.popups.edit({ popup: popup.id }).url}>
                                                            <Button variant="ghost" size="sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(popup.id)}>
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {popups.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {popups.from} to {popups.to} of {popups.total} results
                                </div>
                                <div className="flex gap-2">
                                    {popups.links.map((link, index) => {
                                        if (!link.url) {
                                            return (
                                                <Button key={index} variant="outline" size="sm" disabled
                                                    dangerouslySetInnerHTML={{ __html: link.label }} />
                                            );
                                        }
                                        return (
                                            <Link key={index} href={link.url}>
                                                <Button variant={link.active ? 'default' : 'outline'} size="sm"
                                                    dangerouslySetInnerHTML={{ __html: link.label }} />
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

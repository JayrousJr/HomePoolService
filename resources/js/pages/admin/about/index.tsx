import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type About, type PaginatedData } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';

interface AboutIndexProps {
    abouts: PaginatedData<About>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'About',
        href: admin.about.index().url,
    },
];

export default function AboutIndex({ abouts }: AboutIndexProps) {
    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this about section?')) {
            router.delete(admin.about.destroy({ about: id }).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About Sections" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">About Sections</h1>
                        <p className="text-muted-foreground">
                            Manage about sections displayed on your website
                        </p>
                    </div>
                    <Link href={admin.about.create().url}>
                        <Button>
                            <Plus className="h-4 w-4" />
                            Add About Section
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All About Sections ({abouts.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Title
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Description
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Image
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Created
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {abouts.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No about sections found
                                            </td>
                                        </tr>
                                    ) : (
                                        abouts.data.map((about) => (
                                            <tr
                                                key={about.id}
                                                className="border-b hover:bg-accent/50 transition-colors"
                                            >
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {about.title}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {about.description.substring(0, 100)}
                                                    {about.description.length > 100 && '...'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {about.image_path ? (
                                                        <Badge variant="default">Yes</Badge>
                                                    ) : (
                                                        <Badge variant="secondary">No</Badge>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {new Date(about.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={
                                                                admin.about.show({
                                                                    about: about.id,
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
                                                                admin.about.edit({
                                                                    about: about.id,
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
                                                                handleDelete(about.id)
                                                            }
                                                        >
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

                        {abouts.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {abouts.from} to {abouts.to} of {abouts.total}{' '}
                                    results
                                </div>
                                <div className="flex gap-2">
                                    {abouts.links.map((link, index) => {
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

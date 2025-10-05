import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Gallery, type PaginatedData } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Trash2, Edit } from 'lucide-react';

interface GalleriesIndexProps {
    galleries: PaginatedData<Gallery>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Gallery',
        href: admin.gallery.index().url,
    },
];

export default function GalleriesIndex({ galleries }: GalleriesIndexProps) {
    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this gallery image?')) {
            router.delete(admin.gallery.destroy({ gallery: id }).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Gallery Management</h1>
                        <p className="text-muted-foreground">
                            Manage gallery images displayed on your website
                        </p>
                    </div>
                    <Link href={admin.gallery.create().url}>
                        <Button>
                            <Plus className="h-4 w-4" />
                            Add Image
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Images ({galleries.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {galleries.data.length === 0 ? (
                            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                                No gallery images found. Add your first image to get started.
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {galleries.data.map((gallery) => (
                                        <div
                                            key={gallery.id}
                                            className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
                                        >
                                            <div className="aspect-square overflow-hidden">
                                                <img
                                                    src={`/storage/${gallery.image_path}`}
                                                    alt="Gallery"
                                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                                                <div className="flex h-full items-center justify-center gap-2">
                                                    <Link
                                                        href={admin.gallery.edit({ gallery: gallery.id }).url}
                                                    >
                                                        <Button variant="secondary" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDelete(gallery.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="p-2">
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(gallery.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {galleries.last_page > 1 && (
                                    <div className="mt-6 flex items-center justify-between border-t pt-4">
                                        <div className="text-sm text-muted-foreground">
                                            Showing {galleries.from} to {galleries.to} of {galleries.total}{' '}
                                            results
                                        </div>
                                        <div className="flex gap-2">
                                            {galleries.links.map((link, index) => {
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
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

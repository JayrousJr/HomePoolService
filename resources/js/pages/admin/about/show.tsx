import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type About } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface AboutShowProps {
    about: About;
}

export default function AboutShow({ about }: AboutShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: admin.dashboard().url,
        },
        {
            title: 'About',
            href: admin.about.index().url,
        },
        {
            title: about.title,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`About: ${about.title}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">{about.title}</h1>
                        <p className="text-muted-foreground">
                            View about section details
                        </p>
                    </div>
                    <Link href={admin.about.edit({ about: about.id }).url}>
                        <Button>
                            <Edit className="h-4 w-4" />
                            Edit
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About Section Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Title</p>
                                    <p className="mt-1 text-sm">{about.title}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Created At</p>
                                    <p className="mt-1 text-sm">
                                        {new Date(about.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Description</p>
                                <p className="mt-1 text-sm whitespace-pre-wrap">{about.description}</p>
                            </div>

                            {about.image_path && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Image</p>
                                    <img
                                        src={`/storage/${about.image_path}`}
                                        alt={about.title}
                                        className="max-w-full max-h-96 object-contain rounded-lg border"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

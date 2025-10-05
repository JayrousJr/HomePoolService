import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Popup } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface PopupShowProps { popup: Popup; }

export default function PopupShow({ popup }: PopupShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin Dashboard', href: admin.dashboard().url },
        { title: 'Popups', href: admin.popups.index().url },
        { title: popup.title },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Popup: ${popup.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">{popup.title}</h1>
                        <p className="text-muted-foreground">View popup details</p>
                    </div>
                    <Link href={admin.popups.edit({ popup: popup.id }).url}>
                        <Button><Edit className="h-4 w-4" />Edit</Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader><CardTitle>Popup Information</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Title</p>
                                <p className="mt-1 text-sm">{popup.title}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <div className="mt-1">
                                    <Badge variant={popup.active ? 'default' : 'secondary'}>
                                        {popup.active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                                <p className="mt-1 text-sm">{popup.start_date ? new Date(popup.start_date).toLocaleString() : 'Not set'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">End Date</p>
                                <p className="mt-1 text-sm">{popup.end_date ? new Date(popup.end_date).toLocaleString() : 'Not set'}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Content</p>
                            <p className="mt-1 text-sm whitespace-pre-wrap">{popup.content}</p>
                        </div>
                        {popup.image_path && (
                            <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">Image</p>
                                <img src={`/storage/${popup.image_path}`} alt={popup.title} className="max-w-full max-h-96 object-contain rounded-lg border" />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

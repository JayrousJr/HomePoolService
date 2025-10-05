import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type SocialNetwork } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { Edit, ExternalLink } from 'lucide-react';

interface SocialNetworkShowProps { socialNetwork: SocialNetwork; }

export default function SocialNetworkShow({ socialNetwork }: SocialNetworkShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin Dashboard', href: admin.dashboard().url },
        { title: 'Social Networks', href: admin.socialNetworks.index().url },
        { title: socialNetwork.platform },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Social Network: ${socialNetwork.platform}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">{socialNetwork.platform}</h1>
                        <p className="text-muted-foreground">View social network details</p>
                    </div>
                    <Link href={admin.socialNetworks.edit({ social_network: socialNetwork.id }).url}>
                        <Button><Edit className="h-4 w-4" />Edit</Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader><CardTitle>Social Network Information</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Platform</p>
                                <p className="mt-1 text-sm">{socialNetwork.platform}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <div className="mt-1">
                                    <Badge variant={socialNetwork.active ? 'default' : 'secondary'}>
                                        {socialNetwork.active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Display Order</p>
                                <p className="mt-1 text-sm">{socialNetwork.order || 'Not set'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Icon</p>
                                <p className="mt-1 text-sm">{socialNetwork.icon || 'Not set'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm font-medium text-muted-foreground">URL</p>
                                <div className="mt-1 flex items-center gap-2">
                                    <a href={socialNetwork.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
                                        {socialNetwork.url}
                                    </a>
                                    <ExternalLink className="h-4 w-4 flex-shrink-0" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                                <p className="mt-1 text-sm">{new Date(socialNetwork.created_at).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Updated At</p>
                                <p className="mt-1 text-sm">{new Date(socialNetwork.updated_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

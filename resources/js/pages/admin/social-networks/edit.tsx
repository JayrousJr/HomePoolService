import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type SocialNetwork } from '@/types/models';
import { Head, useForm } from '@inertiajs/react';

interface SocialNetworkEditProps { socialNetwork: SocialNetwork; }

export default function SocialNetworkEdit({ socialNetwork }: SocialNetworkEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin Dashboard', href: admin.dashboard().url },
        { title: 'Social Networks', href: admin.socialNetworks.index().url },
        { title: 'Edit Social Network' },
    ];

    const { data, setData, put, processing, errors } = useForm({
        platform: socialNetwork.platform,
        url: socialNetwork.url,
        icon: socialNetwork.icon || '',
        active: socialNetwork.active,
        order: socialNetwork.order?.toString() || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.socialNetworks.update({ social_network: socialNetwork.id }).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Social Network" />
            <Card>
                <CardHeader><CardTitle>Edit Social Network</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="platform">Platform *</Label>
                                <Input id="platform" value={data.platform} onChange={(e) => setData('platform', e.target.value)} required />
                                {errors.platform && <p className="text-sm text-destructive">{errors.platform}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="url">URL *</Label>
                                <Input id="url" type="url" value={data.url} onChange={(e) => setData('url', e.target.value)} required />
                                {errors.url && <p className="text-sm text-destructive">{errors.url}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="icon">Icon (optional)</Label>
                                <Input id="icon" value={data.icon} onChange={(e) => setData('icon', e.target.value)} />
                                {errors.icon && <p className="text-sm text-destructive">{errors.icon}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="order">Display Order</Label>
                                <Input id="order" type="number" value={data.order} onChange={(e) => setData('order', e.target.value)} />
                                {errors.order && <p className="text-sm text-destructive">{errors.order}</p>}
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="active" checked={data.active} onChange={(e) => setData('active', e.target.checked)} className="rounded" />
                                <Label htmlFor="active">Active</Label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                            <Button type="submit" disabled={processing}>Update Social Network</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: admin.dashboard().url },
    { title: 'Social Networks', href: admin.socialNetworks.index().url },
    { title: 'Create Social Network' },
];

export default function SocialNetworkCreate() {
    const { data, setData, post, processing, errors } = useForm({
        platform: '',
        url: '',
        icon: '',
        active: true,
        order: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.socialNetworks.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Social Network" />
            <Card>
                <CardHeader><CardTitle>Create New Social Network</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="platform">Platform *</Label>
                                <Input id="platform" value={data.platform} onChange={(e) => setData('platform', e.target.value)} required placeholder="e.g., Facebook, Twitter, Instagram" />
                                {errors.platform && <p className="text-sm text-destructive">{errors.platform}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="url">URL *</Label>
                                <Input id="url" type="url" value={data.url} onChange={(e) => setData('url', e.target.value)} required placeholder="https://..." />
                                {errors.url && <p className="text-sm text-destructive">{errors.url}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="icon">Icon (optional)</Label>
                                <Input id="icon" value={data.icon} onChange={(e) => setData('icon', e.target.value)} placeholder="Icon class or path" />
                                {errors.icon && <p className="text-sm text-destructive">{errors.icon}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="order">Display Order</Label>
                                <Input id="order" type="number" value={data.order} onChange={(e) => setData('order', e.target.value)} placeholder="1, 2, 3..." />
                                {errors.order && <p className="text-sm text-destructive">{errors.order}</p>}
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="active" checked={data.active} onChange={(e) => setData('active', e.target.checked)} className="rounded" />
                                <Label htmlFor="active">Active</Label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                            <Button type="submit" disabled={processing}>Create Social Network</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

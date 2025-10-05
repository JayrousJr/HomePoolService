import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Client, type ClientCategory } from '@/types/models';
import { Head, useForm } from '@inertiajs/react';

interface ClientEditProps {
    client: Client & { category?: ClientCategory };
    categories: ClientCategory[];
}

const breadcrumbs = (clientId: string): BreadcrumbItem[] => [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Clients',
        href: admin.clients.index().url,
    },
    {
        title: 'Edit Client',
    },
];

export default function ClientEdit({ client, categories }: ClientEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        client_category_id: client.client_category_id || '',
        name: client.name || '',
        email: client.email || '',
        nationality: client.nationality || '',
        city: client.city || '',
        state: client.state || '',
        street: client.street || '',
        phone: client.phone || '',
        active: client.active || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(admin.clients.update({ client: client.id }).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(client.id)}>
            <Head title="Edit Client" />

            <Card>
                <CardHeader>
                    <CardTitle>Edit Client</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="client_category_id">Category *</Label>
                                <Select
                                    value={data.client_category_id}
                                    onValueChange={(value) => setData('client_category_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.client_category_id && (
                                    <p className="text-sm text-destructive">{errors.client_category_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nationality">Nationality</Label>
                                <Input
                                    id="nationality"
                                    value={data.nationality}
                                    onChange={(e) => setData('nationality', e.target.value)}
                                />
                                {errors.nationality && <p className="text-sm text-destructive">{errors.nationality}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                />
                                {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    value={data.state}
                                    onChange={(e) => setData('state', e.target.value)}
                                />
                                {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="street">Street</Label>
                                <Input
                                    id="street"
                                    value={data.street}
                                    onChange={(e) => setData('street', e.target.value)}
                                />
                                {errors.street && <p className="text-sm text-destructive">{errors.street}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="active"
                                    checked={data.active}
                                    onChange={(e) => setData('active', e.target.checked)}
                                    className="rounded"
                                />
                                <Label htmlFor="active">Active</Label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Update Client
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

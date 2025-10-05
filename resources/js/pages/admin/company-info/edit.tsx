import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type CompanyInfo } from '@/types/models';
import { Head, useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

interface CompanyInfoEditProps {
    companyInfo: CompanyInfo;
}

export default function CompanyInfoEdit({ companyInfo }: CompanyInfoEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: admin.dashboard().url,
        },
        {
            title: 'Company Info',
            href: admin.companyInfo.index().url,
        },
        {
            title: 'Edit Company Info',
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: companyInfo.name,
        email: companyInfo.email,
        phone: companyInfo.phone,
        address: companyInfo.address || '',
        city: companyInfo.city || '',
        state: companyInfo.state || '',
        zip: companyInfo.zip || '',
        description: companyInfo.description || '',
        logo_path: null as File | null,
        _method: 'PUT',
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo_path', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setData('logo_path', null);
        setPreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.companyInfo.update({ company_info: companyInfo.id }).url, {
            forceFormData: true,
        });
    };

    const displayImage = preview || (companyInfo.logo_path ? `/storage/${companyInfo.logo_path}` : null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Company Info" />

            <Card>
                <CardHeader>
                    <CardTitle>Edit Company Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Company Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone *</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                />
                                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
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
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input
                                    id="zip"
                                    value={data.zip}
                                    onChange={(e) => setData('zip', e.target.value)}
                                />
                                {errors.zip && <p className="text-sm text-destructive">{errors.zip}</p>}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="logo_path">Company Logo</Label>
                            <div className="space-y-4">
                                {displayImage && (
                                    <div className="relative">
                                        <img
                                            src={displayImage}
                                            alt="Company Logo"
                                            className="w-full max-h-48 object-contain rounded-lg border"
                                        />
                                        {preview && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-2 right-2"
                                                onClick={handleRemoveImage}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="logo_path"
                                        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <Upload className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {displayImage ? 'Click to upload a new logo' : 'Click to upload logo'}
                                        </span>
                                        <input
                                            id="logo_path"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            {errors.logo_path && (
                                <p className="text-sm text-destructive">{errors.logo_path}</p>
                            )}
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
                                Update Company Info
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

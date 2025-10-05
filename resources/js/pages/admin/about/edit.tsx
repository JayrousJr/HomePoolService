import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type About } from '@/types/models';
import { Head, useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

interface AboutEditProps {
    about: About;
}

export default function AboutEdit({ about }: AboutEditProps) {
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
            title: 'Edit About Section',
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: about.title,
        description: about.description,
        image_path: null as File | null,
        _method: 'PUT',
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image_path', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setData('image_path', null);
        setPreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.about.update({ about: about.id }).url, {
            forceFormData: true,
        });
    };

    const displayImage = preview || (about.image_path ? `/storage/${about.image_path}` : null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit About Section" />

            <Card>
                <CardHeader>
                    <CardTitle>Edit About Section</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={6}
                                required
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image_path">Image</Label>
                            <div className="space-y-4">
                                {displayImage && (
                                    <div className="relative">
                                        <img
                                            src={displayImage}
                                            alt="About"
                                            className="w-full max-h-96 object-contain rounded-lg border"
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
                                        htmlFor="image_path"
                                        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <Upload className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {displayImage ? 'Click to upload a new image' : 'Click to upload an image'}
                                        </span>
                                        <input
                                            id="image_path"
                                            type="file"
                                            className="hidden"
                                            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>

                                <p className="text-xs text-muted-foreground text-center">
                                    PNG, JPG, GIF or WEBP (MAX. 2MB)
                                </p>
                            </div>
                            {errors.image_path && (
                                <p className="text-sm text-destructive">{errors.image_path}</p>
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
                                Update About Section
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

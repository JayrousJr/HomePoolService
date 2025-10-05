import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Gallery } from '@/types/models';
import { Head, useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

interface GalleryEditProps {
    gallery: Gallery;
}

export default function GalleryEdit({ gallery }: GalleryEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: admin.dashboard().url,
        },
        {
            title: 'Gallery',
            href: admin.gallery.index().url,
        },
        {
            title: 'Edit Image',
        },
    ];

    const { data, setData, post, processing, errors } = useForm<{
        image_path: File | null;
        _method: string;
    }>({
        image_path: null,
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
        post(admin.gallery.update({ gallery: gallery.id }).url, {
            forceFormData: true,
        });
    };

    const currentImageUrl = `/storage/${gallery.image_path}`;
    const displayImage = preview || currentImageUrl;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Gallery Image" />

            <Card>
                <CardHeader>
                    <CardTitle>Edit Gallery Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="image_path">Image</Label>
                            <div className="space-y-4">
                                <div className="relative">
                                    <img
                                        src={displayImage}
                                        alt="Gallery"
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

                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="image_path"
                                        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <Upload className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            Click to upload a new image
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
                                Update Image
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

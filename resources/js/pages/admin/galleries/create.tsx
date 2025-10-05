import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

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
        title: 'Add Image',
    },
];

export default function GalleryCreate() {
    const { data, setData, post, processing, errors } = useForm<{
        image_path: File | null;
    }>({
        image_path: null,
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
        post(admin.gallery.store().url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Gallery Image" />

            <Card>
                <CardHeader>
                    <CardTitle>Add New Gallery Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="image_path">Image *</Label>
                            <div className="space-y-4">
                                {!preview ? (
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="image_path"
                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                                <p className="mb-2 text-sm text-muted-foreground">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    PNG, JPG, GIF or WEBP (MAX. 2MB)
                                                </p>
                                            </div>
                                            <input
                                                id="image_path"
                                                type="file"
                                                className="hidden"
                                                accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full max-h-96 object-contain rounded-lg border"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2"
                                            onClick={handleRemoveImage}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
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
                            <Button type="submit" disabled={processing || !data.image_path}>
                                Upload Image
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

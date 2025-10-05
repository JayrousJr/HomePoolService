import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type Popup } from '@/types/models';
import { Head, useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

interface PopupEditProps { popup: Popup; }

export default function PopupEdit({ popup }: PopupEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin Dashboard', href: admin.dashboard().url },
        { title: 'Popups', href: admin.popups.index().url },
        { title: 'Edit Popup' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: popup.title,
        content: popup.content,
        image_path: null as File | null,
        active: popup.active,
        start_date: popup.start_date || '',
        end_date: popup.end_date || '',
        _method: 'PUT',
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image_path', file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.popups.update({ popup: popup.id }).url, { forceFormData: true });
    };

    const displayImage = preview || (popup.image_path ? `/storage/${popup.image_path}` : null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Popup" />
            <Card>
                <CardHeader><CardTitle>Edit Popup</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="active" checked={data.active} onChange={(e) => setData('active', e.target.checked)} className="rounded" />
                                <Label htmlFor="active">Active</Label>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="start_date">Start Date</Label>
                                <Input id="start_date" type="datetime-local" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end_date">End Date</Label>
                                <Input id="end_date" type="datetime-local" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="content">Content *</Label>
                                <Textarea id="content" value={data.content} onChange={(e) => setData('content', e.target.value)} rows={6} required />
                                {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Image</Label>
                            {displayImage && (
                                <div className="relative">
                                    <img src={displayImage} alt="Popup" className="w-full max-h-64 object-contain rounded-lg border" />
                                    {preview && (
                                        <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => { setData('image_path', null); setPreview(null); }}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            )}
                            <label htmlFor="image_path" className="flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                <Upload className="w-4 h-4" />
                                <span className="text-sm">{displayImage ? 'Upload new image' : 'Upload image'}</span>
                                <input id="image_path" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                            <Button type="submit" disabled={processing}>Update Popup</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

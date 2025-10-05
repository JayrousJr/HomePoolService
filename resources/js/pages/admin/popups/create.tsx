import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: admin.dashboard().url },
    { title: 'Popups', href: admin.popups.index().url },
    { title: 'Create Popup' },
];

export default function PopupCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        image_path: null as File | null,
        active: true,
        start_date: '',
        end_date: '',
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
        post(admin.popups.store().url, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Popup" />
            <Card>
                <CardHeader><CardTitle>Create New Popup</CardTitle></CardHeader>
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
                            {!preview ? (
                                <label htmlFor="image_path" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                    <p className="text-xs text-muted-foreground">Click to upload</p>
                                    <input id="image_path" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            ) : (
                                <div className="relative">
                                    <img src={preview} alt="Preview" className="w-full max-h-64 object-contain rounded-lg border" />
                                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => { setData('image_path', null); setPreview(null); }}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                            <Button type="submit" disabled={processing}>Create Popup</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

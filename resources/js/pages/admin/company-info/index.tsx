import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type CompanyInfo, type PaginatedData } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';

interface CompanyInfoIndexProps {
    companyInfos: PaginatedData<CompanyInfo>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Company Info',
        href: admin.companyInfo.index().url,
    },
];

export default function CompanyInfoIndex({ companyInfos }: CompanyInfoIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this company info?')) {
            router.delete(admin.companyInfo.destroy({ company_info: id }).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Company Information" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Company Information</h1>
                        <p className="text-muted-foreground">
                            Manage your company information
                        </p>
                    </div>
                    <Link href={admin.companyInfo.create().url}>
                        <Button>
                            <Plus className="h-4 w-4" />
                            Add Company Info
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Company Information ({companyInfos.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Email
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Phone
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Location
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Logo
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companyInfos.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No company information found
                                            </td>
                                        </tr>
                                    ) : (
                                        companyInfos.data.map((info) => (
                                            <tr
                                                key={info.id}
                                                className="border-b hover:bg-accent/50 transition-colors"
                                            >
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {info.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {info.email}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {info.phone}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {info.city && info.state ? `${info.city}, ${info.state}` : '-'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {info.logo_path ? (
                                                        <Badge variant="default">Yes</Badge>
                                                    ) : (
                                                        <Badge variant="secondary">No</Badge>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={
                                                                admin.companyInfo.show({
                                                                    company_info: info.id,
                                                                }).url
                                                            }
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link
                                                            href={
                                                                admin.companyInfo.edit({
                                                                    company_info: info.id,
                                                                }).url
                                                            }
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(info.id)
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {companyInfos.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {companyInfos.from} to {companyInfos.to} of {companyInfos.total}{' '}
                                    results
                                </div>
                                <div className="flex gap-2">
                                    {companyInfos.links.map((link, index) => {
                                        if (!link.url) {
                                            return (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    size="sm"
                                                    disabled
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            );
                                        }

                                        return (
                                            <Link key={index} href={link.url}>
                                                <Button
                                                    variant={
                                                        link.active ? 'default' : 'outline'
                                                    }
                                                    size="sm"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

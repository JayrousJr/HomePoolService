import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type CompanyInfo } from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface CompanyInfoShowProps {
    companyInfo: CompanyInfo;
}

export default function CompanyInfoShow({ companyInfo }: CompanyInfoShowProps) {
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
            title: companyInfo.name,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Company Info: ${companyInfo.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">{companyInfo.name}</h1>
                        <p className="text-muted-foreground">
                            View company information details
                        </p>
                    </div>
                    <Link href={admin.companyInfo.edit({ company_info: companyInfo.id }).url}>
                        <Button>
                            <Edit className="h-4 w-4" />
                            Edit
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Company Name</p>
                                    <p className="mt-1 text-sm">{companyInfo.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <p className="mt-1 text-sm">{companyInfo.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                    <p className="mt-1 text-sm">{companyInfo.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                                    <p className="mt-1 text-sm">{companyInfo.address || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">City</p>
                                    <p className="mt-1 text-sm">{companyInfo.city || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">State</p>
                                    <p className="mt-1 text-sm">{companyInfo.state || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">ZIP Code</p>
                                    <p className="mt-1 text-sm">{companyInfo.zip || '-'}</p>
                                </div>
                            </div>

                            {companyInfo.description && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Description</p>
                                    <p className="mt-1 text-sm whitespace-pre-wrap">{companyInfo.description}</p>
                                </div>
                            )}

                            {companyInfo.logo_path && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Company Logo</p>
                                    <img
                                        src={`/storage/${companyInfo.logo_path}`}
                                        alt={companyInfo.name}
                                        className="max-w-xs max-h-48 object-contain rounded-lg border"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

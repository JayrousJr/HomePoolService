import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type JobApplicant, type PaginatedData } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Edit, Trash2, FileText, Download } from 'lucide-react';

interface JobApplicantsIndexProps {
    applicants: PaginatedData<JobApplicant>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard().url,
    },
    {
        title: 'Job Applicants',
        href: admin.jobApplicants.index().url,
    },
];

const getStatusVariant = (
    status: JobApplicant['hire_status']
): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
        case 'hired':
            return 'default';
        case 'interviewed':
            return 'secondary';
        case 'rejected':
            return 'destructive';
        case 'reviewing':
        case 'pending':
        default:
            return 'outline';
    }
};

const getStatusLabel = (status: JobApplicant['hire_status']): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function JobApplicantsIndex({ applicants }: JobApplicantsIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this applicant?')) {
            router.delete(admin.jobApplicants.destroy({ job_applicant: id }).url);
        }
    };

    const handleDownloadResume = (resumePath: string) => {
        window.open(resumePath, '_blank');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Job Applicants" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Job Applicants
                        </h1>
                        <p className="text-muted-foreground">
                            Review and manage job applications
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Applicants ({applicants.total})</CardTitle>
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
                                            Hire Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Resume
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">
                                            Applied At
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applicants.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No applicants found
                                            </td>
                                        </tr>
                                    ) : (
                                        applicants.data.map((applicant) => (
                                            <tr
                                                key={applicant.id}
                                                className="border-b hover:bg-accent/50 transition-colors"
                                            >
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {applicant.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {applicant.email}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {applicant.phone}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {applicant.city && applicant.state
                                                        ? `${applicant.city}, ${applicant.state}`
                                                        : applicant.zip || 'N/A'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant={getStatusVariant(
                                                            applicant.hire_status
                                                        )}
                                                    >
                                                        {getStatusLabel(applicant.hire_status)}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {applicant.resume_path ? (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDownloadResume(
                                                                    applicant.resume_path!
                                                                )
                                                            }
                                                        >
                                                            <Download className="h-4 w-4 mr-1" />
                                                            View
                                                        </Button>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">
                                                            No resume
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {new Date(
                                                        applicant.created_at
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={
                                                                admin.jobApplicants.show({
                                                                    job_applicant: applicant.id,
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
                                                                admin.jobApplicants.edit({
                                                                    job_applicant: applicant.id,
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
                                                                handleDelete(applicant.id)
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

                        {applicants.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-sm text-muted-foreground">
                                    Showing {applicants.from} to {applicants.to} of{' '}
                                    {applicants.total} results
                                </div>
                                <div className="flex gap-2">
                                    {applicants.links.map((link, index) => {
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

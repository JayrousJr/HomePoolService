import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { type JobApplicant, type PaginatedData } from '@/types/models';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Check, Eye, Trash2, UserCheck, UserPlus, X } from 'lucide-react';
import { useState } from 'react';

interface JobApplicantsIndexProps {
    applicants: PaginatedData<JobApplicant>;
    applicationWindow: any;
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
    status: string,
): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
        case 'hired':
            return 'default';
        case 'accepted':
            return 'secondary';
        case 'rejected':
            return 'destructive';
        case 'pending':
        default:
            return 'outline';
    }
};

export default function JobApplicantsIndex({
    applicants,
    applicationWindow,
}: JobApplicantsIndexProps) {
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [selectedApplicant, setSelectedApplicant] =
        useState<JobApplicant | null>(null);
    const [opeJobs, setOpeJobs] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        rejection_reason: '',
    });

    const handleAccept = (applicantId: string) => {
        if (confirm('Are you sure you want to accept this application?')) {
            router.post(`/admin/job-applicants/${applicantId}/accept`);
        }
    };

    const handleRejectClick = (applicant: JobApplicant) => {
        setSelectedApplicant(applicant);
        setRejectDialogOpen(true);
    };

    const handleRejectSubmit = () => {
        if (selectedApplicant) {
            post(`/admin/job-applicants/${selectedApplicant.id}/reject`, {
                onSuccess: () => {
                    setRejectDialogOpen(false);
                    reset();
                    setSelectedApplicant(null);
                },
            });
        }
    };

    const handleApplicationClose = () => {
        if (
            confirm(
                `Are tou sure you are ${applicationWindow.open ? 'Close Application Window?' : ' Open Application window for Technician to apply?'} `,
            )
        ) {
            router.put(`/admin/toggle/${applicationWindow.id}`, {
                data: applicationWindow.open,
            });
        }
    };

    const handleHire = (applicantId: string) => {
        if (
            confirm(
                'Are you sure you want to hire this applicant? This will create a technician account and send credentials via email.',
            )
        ) {
            router.post(`/admin/job-applicants/${applicantId}/hire`);
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this applicant?')) {
            router.delete(
                admin.jobApplicants.destroy({ job_applicant: id }).url,
            );
        }
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
                    <div className="">
                        <Button
                            onClick={handleApplicationClose}
                            className={`${applicationWindow.open}`}
                        >
                            {`${applicationWindow.open ? 'Close Application Window' : ' Open Applications'}`}
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Applications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {applicants.total}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Pending
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {
                                    applicants.data.filter(
                                        (a) => a.status === 'pending',
                                    ).length
                                }
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Accepted
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {
                                    applicants.data.filter(
                                        (a) => a.status === 'accepted',
                                    ).length
                                }
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Hired
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {
                                    applicants.data.filter(
                                        (a) => a.status === 'hired',
                                    ).length
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            All Applicants ({applicants.total})
                        </CardTitle>
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
                                            Status
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
                                                colSpan={7}
                                                className="px-4 py-8 text-center text-sm text-muted-foreground"
                                            >
                                                No applicants found
                                            </td>
                                        </tr>
                                    ) : (
                                        applicants.data.map((applicant) => (
                                            <tr
                                                key={applicant.id}
                                                className="border-b transition-colors hover:bg-accent/50"
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
                                                    {applicant.city &&
                                                    applicant.state
                                                        ? `${applicant.city}, ${applicant.state}`
                                                        : applicant.zip ||
                                                          'N/A'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge
                                                        variant={getStatusVariant(
                                                            applicant.status ||
                                                                'pending',
                                                        )}
                                                    >
                                                        {(
                                                            applicant.status ||
                                                            'pending'
                                                        )
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            (
                                                                applicant.status ||
                                                                'pending'
                                                            ).slice(1)}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {new Date(
                                                        applicant.created_at,
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={
                                                                admin.jobApplicants.show(
                                                                    {
                                                                        job_applicant:
                                                                            applicant.id,
                                                                    },
                                                                ).url
                                                            }
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                title="View Details"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>

                                                        {applicant.status ===
                                                            'pending' && (
                                                            <>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleAccept(
                                                                            applicant.id,
                                                                        )
                                                                    }
                                                                    title="Accept"
                                                                    className="text-green-600 hover:text-green-700"
                                                                >
                                                                    <Check className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleRejectClick(
                                                                            applicant,
                                                                        )
                                                                    }
                                                                    title="Reject"
                                                                    className="text-red-600 hover:text-red-700"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        )}

                                                        {applicant.status ===
                                                            'accepted' && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleHire(
                                                                        applicant.id,
                                                                    )
                                                                }
                                                                title="Hire & Create Account"
                                                                className="text-blue-600 hover:text-blue-700"
                                                            >
                                                                <UserPlus className="h-4 w-4" />
                                                            </Button>
                                                        )}

                                                        {applicant.status ===
                                                            'hired' && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                disabled
                                                                title="Hired"
                                                                className="text-green-600"
                                                            >
                                                                <UserCheck className="h-4 w-4" />
                                                            </Button>
                                                        )}

                                                        {applicant.status !==
                                                            'hired' && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        applicant.id,
                                                                    )
                                                                }
                                                                title="Delete"
                                                            >
                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        )}
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
                                    Showing {applicants.from} to {applicants.to}{' '}
                                    of {applicants.total} results
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
                                                        link.active
                                                            ? 'default'
                                                            : 'outline'
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

            {/* Reject Dialog */}
            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Application</DialogTitle>
                        <DialogDescription>
                            Provide a reason for rejecting this application
                            (optional). An email will be sent to the applicant.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="rejection_reason">
                                Rejection Reason
                            </Label>
                            <Textarea
                                id="rejection_reason"
                                placeholder="Enter reason for rejection (optional)..."
                                value={data.rejection_reason}
                                onChange={(e) =>
                                    setData('rejection_reason', e.target.value)
                                }
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setRejectDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleRejectSubmit}
                            disabled={processing}
                        >
                            {processing ? 'Rejecting...' : 'Reject Application'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { type JobApplicant } from '@/types/models';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Check,
    CheckCircle,
    Clock,
    Home,
    Mail,
    MapPin,
    Phone,
    Trash2,
    User,
    UserCheck,
    UserPlus,
    X,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface JobApplicantShowProps {
    applicant: JobApplicant;
}

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

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'hired':
            return <UserCheck className="h-5 w-5 text-green-500" />;
        case 'accepted':
            return <CheckCircle className="h-5 w-5 text-blue-500" />;
        case 'rejected':
            return <XCircle className="h-5 w-5 text-red-500" />;
        case 'pending':
        default:
            return <Clock className="h-5 w-5 text-yellow-500" />;
    }
};

export default function JobApplicantShow({ applicant }: JobApplicantShowProps) {
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        rejection_reason: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Job Applicants',
            href: admin.jobApplicants.index().url,
        },
        {
            title: applicant.name,
            href: admin.jobApplicants.show({ job_applicant: applicant.id }).url,
        },
    ];

    const handleAccept = () => {
        if (confirm('Are you sure you want to accept this application?')) {
            router.post(`/admin/job-applicants/${applicant.id}/accept`);
        }
    };

    const handleRejectSubmit = () => {
        post(`/admin/job-applicants/${applicant.id}/reject`, {
            onSuccess: () => {
                setRejectDialogOpen(false);
                reset();
            },
        });
    };

    const handleHire = () => {
        if (
            confirm(
                'Are you sure you want to hire this applicant? This will create a technician account and send credentials via email.',
            )
        ) {
            router.post(`/admin/job-applicants/${applicant.id}/hire`);
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this applicant?')) {
            router.delete(
                admin.jobApplicants.destroy({ job_applicant: applicant.id })
                    .url,
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Job Applicant: ${applicant.name}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href={admin.jobApplicants.index().url}>
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">
                                {applicant.name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Job Application Details
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {applicant.status === 'pending' && (
                            <>
                                <Button onClick={handleAccept}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Accept Application
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => setRejectDialogOpen(true)}
                                >
                                    <X className="mr-2 h-4 w-4" />
                                    Reject
                                </Button>
                            </>
                        )}

                        {applicant.status === 'accepted' && (
                            <Button onClick={handleHire}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Hire & Create Account
                            </Button>
                        )}

                        {applicant.status !== 'hired' && (
                            <Button variant="outline" onClick={handleDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        )}
                    </div>
                </div>

                {/* Status Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Application Status</CardTitle>
                        <CardDescription>
                            Current status and timeline
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            {getStatusIcon(applicant.status || 'pending')}
                            <div>
                                <p className="text-sm font-medium">Status</p>
                                <Badge
                                    variant={getStatusVariant(
                                        applicant.status || 'pending',
                                    )}
                                >
                                    {(applicant.status || 'pending')
                                        .charAt(0)
                                        .toUpperCase() +
                                        (applicant.status || 'pending').slice(
                                            1,
                                        )}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">
                                    Applied On
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(
                                        applicant.created_at,
                                    ).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                        {applicant.accepted_at && (
                            <div className="flex items-start gap-3">
                                <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Accepted On
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(
                                            applicant.accepted_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )}
                        {applicant.hired_at && (
                            <div className="flex items-start gap-3">
                                <UserCheck className="mt-0.5 h-5 w-5 text-green-500" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Hired On
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(
                                            applicant.hired_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )}
                        {applicant.rejected_at && (
                            <div className="flex items-start gap-3">
                                <XCircle className="mt-0.5 h-5 w-5 text-red-500" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Rejected On
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(
                                            applicant.rejected_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Rejection Reason */}
                {applicant.rejection_reason && (
                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">
                                Rejection Reason
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                                {applicant.rejection_reason}
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Personal Information */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>
                                Basic applicant details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Full Name
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {applicant.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <a
                                        href={`mailto:${applicant.email}`}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        {applicant.email}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <a
                                        href={`tel:${applicant.phone}`}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        {applicant.phone}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Date of Birth
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {applicant.birthdate
                                            ? new Date(
                                                  applicant.birthdate,
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                    {applicant.age && (
                                        <p className="text-xs text-muted-foreground">
                                            Age: {applicant.age}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Address Information</CardTitle>
                            <CardDescription>Location details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Address
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {applicant.street}
                                        <br />
                                        {applicant.city}, {applicant.state}{' '}
                                        {applicant.zip}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Home className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">
                                        Nationality
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {applicant.nationality || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Work Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>Work Preferences</CardTitle>
                        <CardDescription>
                            Availability and work schedule
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="mb-2 text-sm font-medium">
                                    Available Days
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {applicant.days &&
                                    Array.isArray(applicant.days) ? (
                                        applicant.days.map((day: string) => (
                                            <Badge key={day} variant="outline">
                                                {day}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-sm text-muted-foreground">
                                            Not specified
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-medium">
                                    Work Hours
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {applicant.starttime} - {applicant.endtime}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {applicant.workHours} hours per week
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-medium">
                                    Work Period
                                </p>
                                <Badge variant="outline">
                                    {applicant.workperiod || 'N/A'}
                                </Badge>
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-medium">
                                    Available Start Date
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {applicant.startdate
                                        ? new Date(
                                              applicant.startdate,
                                          ).toLocaleDateString()
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Additional Information</CardTitle>
                        <CardDescription>
                            Other relevant details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Social Security
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {applicant.socialsecurity === 'yes'
                                        ? `Yes - ${applicant.socialsecurityNumber || 'Not provided'}`
                                        : `No - EIN: ${applicant.einNumber || 'Not provided'}`}
                                </p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Smoker
                                </p>
                                <Badge
                                    variant={
                                        applicant.smoke === 'yes'
                                            ? 'destructive'
                                            : 'default'
                                    }
                                >
                                    {applicant.smoke === 'yes' ? 'Yes' : 'No'}
                                </Badge>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Own Transportation
                                </p>
                                <Badge
                                    variant={
                                        applicant.transport === 'yes'
                                            ? 'default'
                                            : 'secondary'
                                    }
                                >
                                    {applicant.transport === 'yes'
                                        ? 'Yes'
                                        : 'No'}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Driver's License */}
                {applicant.licence === 'yes' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Driver's License Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium">
                                        License Number
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {applicant.licenceNumber || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Issued City
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {applicant.issuedcity || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Issued Date
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {applicant.issueddate
                                            ? new Date(
                                                  applicant.issueddate,
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        Expiration Date
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {applicant.expiredate
                                            ? new Date(
                                                  applicant.expiredate,
                                              ).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
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

import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
    type About,
    type SocialNetwork,
    type CompanyInfo,
} from '@/types/models';
import {
    Briefcase,
    Users,
    Clock,
    CheckCircle,
    Send,
    UserPlus,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CareersProps {
    socialnetwork?: SocialNetwork[];
    infos?: CompanyInfo[];
}

const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export default function Careers({
    socialnetwork = [],
    infos = [],
}: CareersProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        nationality: '',
        city: '',
        state: '',
        street: '',
        zip: '',
        age: '',
        birthdate: '',
        socialsecurity: '',
        socialsecurityNumber: '',
        einNumber: '',
        days: [] as string[],
        starttime: '',
        endtime: '',
        startdate: '',
        workperiod: '',
        workHours: '',
        smoke: '',
        licence: '',
        licenceNumber: '',
        issueddate: '',
        expiredate: '',
        issuedcity: '',
        transport: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/careers/apply', {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleDayToggle = (day: string, checked: boolean) => {
        if (checked) {
            setData('days', [...data.days, day]);
        } else {
            setData(
                'days',
                data.days.filter((d) => d !== day),
            );
        }
    };

    const benefits = [
        'Competitive salary package',
        'Flexible working hours',
        'Professional development opportunities',
        'Health and wellness benefits',
        'Supportive team environment',
        'Career growth potential',
    ];

    return (
        <PublicLayout
            currentPath="/careers"
            socialNetworks={socialnetwork}
            companyInfo={infos}
        >
            <Head title="Join Our Team - Careers" />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 py-20 -mt-16 pt-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                                <UserPlus className="h-3 w-3 mr-1" />
                                Join Our Team
                            </Badge>
                        </motion.div>
                        <motion.h1
                            className="text-4xl md:text-5xl font-bold text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Build Your Career With Us
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-blue-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            We're always looking for talented individuals to join
                            our growing team of pool service professionals.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">
                                Why Work With Us?
                            </h2>
                            <p className="text-muted-foreground">
                                Discover the benefits of joining our team
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <Card>
                                <CardHeader>
                                    <Briefcase className="h-10 w-10 text-blue-600 mb-2" />
                                    <CardTitle>Professional Growth</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Continuous training and development
                                        opportunities to advance your career.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <Users className="h-10 w-10 text-blue-600 mb-2" />
                                    <CardTitle>Great Team</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Work with experienced professionals in a
                                        supportive environment.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <Clock className="h-10 w-10 text-blue-600 mb-2" />
                                    <CardTitle>Flexibility</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Flexible schedules that work with your
                                        lifestyle and commitments.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="bg-blue-50 border-blue-200">
                            <CardHeader>
                                <CardTitle>Benefits & Perks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {benefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircle className="h-5 w-5 text-blue-600" />
                                            <span>{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Application Form Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4">
                                Apply Now
                            </h2>
                            <p className="text-muted-foreground">
                                Fill out the form below to submit your
                                application
                            </p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Job Application Form</CardTitle>
                                <CardDescription>
                                    Please provide accurate information. All
                                    fields are required unless marked optional.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Personal Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">
                                            Personal Information
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">
                                                    Full Name *
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                {errors.name && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">
                                                    Email *
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            'email',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                {errors.email && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone">
                                                    Phone *
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            'phone',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                {errors.phone && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="age">
                                                    Age *
                                                </Label>
                                                <Input
                                                    id="age"
                                                    type="number"
                                                    value={data.age}
                                                    onChange={(e) =>
                                                        setData(
                                                            'age',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                {errors.age && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.age}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="birthdate">
                                                    Date of Birth *
                                                </Label>
                                                <Input
                                                    id="birthdate"
                                                    type="date"
                                                    value={data.birthdate}
                                                    onChange={(e) =>
                                                        setData(
                                                            'birthdate',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                {errors.birthdate && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.birthdate}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">
                                            Address Information
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="street">
                                                    Street Address *
                                                </Label>
                                                <Input
                                                    id="street"
                                                    value={data.street}
                                                    onChange={(e) =>
                                                        setData(
                                                            'street',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                {errors.street && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.street}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="city">
                                                    City *
                                                </Label>
                                                <Input
                                                    id="city"
                                                    value={data.city}
                                                    onChange={(e) =>
                                                        setData(
                                                            'city',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                {errors.city && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.city}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="state">
                                                    State *
                                                </Label>
                                                <Input
                                                    id="state"
                                                    value={data.state}
                                                    onChange={(e) =>
                                                        setData(
                                                            'state',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                {errors.state && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.state}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="zip">
                                                    ZIP Code *
                                                </Label>
                                                <Input
                                                    id="zip"
                                                    value={data.zip}
                                                    onChange={(e) =>
                                                        setData(
                                                            'zip',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                {errors.zip && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.zip}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="nationality">
                                                    Nationality *
                                                </Label>
                                                <Input
                                                    id="nationality"
                                                    value={data.nationality}
                                                    onChange={(e) =>
                                                        setData(
                                                            'nationality',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                                {errors.nationality && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.nationality}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Work Preferences */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">
                                            Work Preferences
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>
                                                    Available Days *
                                                </Label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    {daysOfWeek.map((day) => (
                                                        <div
                                                            key={day}
                                                            className="flex items-center space-x-2"
                                                        >
                                                            <Checkbox
                                                                id={day}
                                                                checked={data.days.includes(
                                                                    day,
                                                                )}
                                                                onCheckedChange={(
                                                                    checked,
                                                                ) =>
                                                                    handleDayToggle(
                                                                        day,
                                                                        checked as boolean,
                                                                    )
                                                                }
                                                            />
                                                            <Label
                                                                htmlFor={day}
                                                                className="text-sm font-normal cursor-pointer"
                                                            >
                                                                {day}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                                {errors.days && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.days}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="starttime">
                                                        Start Time *
                                                    </Label>
                                                    <Input
                                                        id="starttime"
                                                        type="time"
                                                        value={data.starttime}
                                                        onChange={(e) =>
                                                            setData(
                                                                'starttime',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="endtime">
                                                        End Time *
                                                    </Label>
                                                    <Input
                                                        id="endtime"
                                                        type="time"
                                                        value={data.endtime}
                                                        onChange={(e) =>
                                                            setData(
                                                                'endtime',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="startdate">
                                                        Available Start Date *
                                                    </Label>
                                                    <Input
                                                        id="startdate"
                                                        type="date"
                                                        value={data.startdate}
                                                        onChange={(e) =>
                                                            setData(
                                                                'startdate',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="workHours">
                                                        Desired Work Hours/Week
                                                        *
                                                    </Label>
                                                    <Input
                                                        id="workHours"
                                                        type="number"
                                                        value={data.workHours}
                                                        onChange={(e) =>
                                                            setData(
                                                                'workHours',
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="workperiod">
                                                        Work Period Preference *
                                                    </Label>
                                                    <Select
                                                        value={data.workperiod}
                                                        onValueChange={(value) =>
                                                            setData(
                                                                'workperiod',
                                                                value,
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select period" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="full-time">
                                                                Full Time
                                                            </SelectItem>
                                                            <SelectItem value="part-time">
                                                                Part Time
                                                            </SelectItem>
                                                            <SelectItem value="temporary">
                                                                Temporary
                                                            </SelectItem>
                                                            <SelectItem value="seasonal">
                                                                Seasonal
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">
                                            Additional Information
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="socialsecurity">
                                                    Do you have a Social
                                                    Security? *
                                                </Label>
                                                <Select
                                                    value={data.socialsecurity}
                                                    onValueChange={(value) =>
                                                        setData(
                                                            'socialsecurity',
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="yes">
                                                            Yes
                                                        </SelectItem>
                                                        <SelectItem value="no">
                                                            No
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {data.socialsecurity === 'yes' && (
                                                <div className="space-y-2">
                                                    <Label htmlFor="socialsecurityNumber">
                                                        Social Security Number
                                                    </Label>
                                                    <Input
                                                        id="socialsecurityNumber"
                                                        value={
                                                            data.socialsecurityNumber
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'socialsecurityNumber',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}

                                            {data.socialsecurity === 'no' && (
                                                <div className="space-y-2">
                                                    <Label htmlFor="einNumber">
                                                        EIN Number
                                                    </Label>
                                                    <Input
                                                        id="einNumber"
                                                        value={data.einNumber}
                                                        onChange={(e) =>
                                                            setData(
                                                                'einNumber',
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <Label htmlFor="smoke">
                                                    Do you smoke? *
                                                </Label>
                                                <Select
                                                    value={data.smoke}
                                                    onValueChange={(value) =>
                                                        setData('smoke', value)
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="yes">
                                                            Yes
                                                        </SelectItem>
                                                        <SelectItem value="no">
                                                            No
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="transport">
                                                    Do you have your own
                                                    transportation? *
                                                </Label>
                                                <Select
                                                    value={data.transport}
                                                    onValueChange={(value) =>
                                                        setData(
                                                            'transport',
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="yes">
                                                            Yes
                                                        </SelectItem>
                                                        <SelectItem value="no">
                                                            No
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Driver's License */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">
                                            Driver's License Information
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="licence">
                                                    Do you have a driver's
                                                    license? *
                                                </Label>
                                                <Select
                                                    value={data.licence}
                                                    onValueChange={(value) =>
                                                        setData('licence', value)
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="yes">
                                                            Yes
                                                        </SelectItem>
                                                        <SelectItem value="no">
                                                            No
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {data.licence === 'yes' && (
                                                <>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="licenceNumber">
                                                            License Number
                                                        </Label>
                                                        <Input
                                                            id="licenceNumber"
                                                            value={
                                                                data.licenceNumber
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'licenceNumber',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="issueddate">
                                                            Issued Date
                                                        </Label>
                                                        <Input
                                                            id="issueddate"
                                                            type="date"
                                                            value={
                                                                data.issueddate
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'issueddate',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="expiredate">
                                                            Expiration Date
                                                        </Label>
                                                        <Input
                                                            id="expiredate"
                                                            type="date"
                                                            value={
                                                                data.expiredate
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'expiredate',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="issuedcity">
                                                            Issued City
                                                        </Label>
                                                        <Input
                                                            id="issuedcity"
                                                            value={
                                                                data.issuedcity
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'issuedcity',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            size="lg"
                                        >
                                            <Send className="mr-2 h-4 w-4" />
                                            {processing
                                                ? 'Submitting...'
                                                : 'Submit Application'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

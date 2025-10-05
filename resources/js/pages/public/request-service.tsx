import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import PublicLayout from '@/layouts/public-layout';
import { contact as serviceImage } from '@/lib/exports';
import {
    type About,
    type CompanyInfo,
    type PopUp,
    type SocialNetwork,
} from '@/types/models';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Calendar,
    CheckCircle,
    Droplets,
    Send,
    Sparkles,
    Wrench,
} from 'lucide-react';

interface RequestServiceProps {
    abouts?: About[];
    socialnetwork?: SocialNetwork[];
    infos?: CompanyInfo[];
    popups?: PopUp[];
}

const serviceTypes = [
    {
        value: 'Pool Cleaning',
        label: 'Pool Cleaning',
        icon: Sparkles,
        description: 'Regular maintenance and cleaning',
    },
    {
        value: 'Pool Repair',
        label: 'Pool Repair',
        icon: Wrench,
        description: 'Equipment and structural repairs',
    },
    {
        value: 'Chemical Balance',
        label: 'Chemical Balance',
        icon: Droplets,
        description: 'Water chemistry and treatment',
    },
    {
        value: 'Equipment Installation',
        label: 'Equipment Installation',
        icon: Wrench,
        description: 'New equipment setup',
    },
    {
        value: 'Inspection',
        label: 'Pool Inspection',
        icon: CheckCircle,
        description: 'Comprehensive pool assessment',
    },
    {
        value: 'Other',
        label: 'Other Services',
        icon: Calendar,
        description: 'Custom service request',
    },
];

export default function RequestService({
    abouts = [],
    socialnetwork = [],
    infos = [],
    popups = [],
}: RequestServiceProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        zip: '',
        service: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/request', {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <PublicLayout
            currentPath="/request-service"
            socialNetworks={socialnetwork}
            companyInfo={infos}
        >
            <Head title="Request Service - Pool Service" />

            {/* Hero Section */}
            <section className="relative -mt-16 h-[400px] overflow-hidden pt-16 md:h-[500px]">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${serviceImage})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60" />

                {/* Content */}
                <div className="relative container mx-auto h-full px-4">
                    <div className="flex h-full items-center justify-center">
                        <div className="mx-auto max-w-3xl space-y-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Badge className="border-white/30 bg-white/20 text-white hover:bg-white/30">
                                    <Calendar className="mr-1 h-3 w-3" />
                                    Schedule Service
                                </Badge>
                            </motion.div>
                            <motion.h1
                                className="text-4xl font-bold text-white md:text-5xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Request Pool Service
                            </motion.h1>
                            <motion.p
                                className="mx-auto max-w-2xl text-xl text-white/90"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Get professional pool maintenance and repair
                                services tailored to your needs
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Request Form */}
            <section className="bg-muted/30 py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">
                                        Service Request Form
                                    </CardTitle>
                                    <CardDescription>
                                        Fill out the form below and our team
                                        will contact you shortly to schedule
                                        your service
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        {/* Contact Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold">
                                                Contact Information
                                            </h3>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">
                                                        Full Name *
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        placeholder="John Doe"
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
                                                        Email Address *
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="john@example.com"
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
                                                        Phone Number *
                                                    </Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="+1 (555) 000-0000"
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
                                                    <Label htmlFor="zip">
                                                        ZIP Code *
                                                    </Label>
                                                    <Input
                                                        id="zip"
                                                        placeholder="12345"
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
                                            </div>
                                        </div>

                                        {/* Service Details */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold">
                                                Service Details
                                            </h3>

                                            <div className="space-y-2">
                                                <Label htmlFor="service">
                                                    Service Type *
                                                </Label>
                                                <Select
                                                    value={data.service}
                                                    onValueChange={(value) =>
                                                        setData(
                                                            'service',
                                                            value,
                                                        )
                                                    }
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a service type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {serviceTypes.map(
                                                            (service) => (
                                                                <SelectItem
                                                                    key={
                                                                        service.value
                                                                    }
                                                                    value={
                                                                        service.value
                                                                    }
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <service.icon className="h-4 w-4" />
                                                                        <span>
                                                                            {
                                                                                service.label
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                {errors.service && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.service}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="description">
                                                    Service Description *
                                                </Label>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Please describe your pool service needs in detail..."
                                                    value={data.description}
                                                    onChange={(e) =>
                                                        setData(
                                                            'description',
                                                            e.target.value,
                                                        )
                                                    }
                                                    rows={6}
                                                    required
                                                />
                                                {errors.description && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.description}
                                                    </p>
                                                )}
                                                <p className="text-sm text-muted-foreground">
                                                    Include details like pool
                                                    size, current issues, and
                                                    preferred service date
                                                </p>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full"
                                            disabled={processing}
                                        >
                                            <Send className="mr-2 h-4 w-4" />
                                            {processing
                                                ? 'Submitting Request...'
                                                : 'Submit Service Request'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Why Choose Our Service?
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Professional pool care with guaranteed satisfaction
                        </p>
                    </motion.div>

                    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: CheckCircle,
                                title: 'Quick Response',
                                description:
                                    'We respond to all service requests within 24 hours',
                            },
                            {
                                icon: Wrench,
                                title: 'Expert Technicians',
                                description:
                                    'Certified professionals with years of experience',
                            },
                            {
                                icon: Sparkles,
                                title: 'Quality Guarantee',
                                description:
                                    '100% satisfaction guarantee on all services',
                            },
                        ].map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                            >
                                <Card className="h-full text-center">
                                    <CardContent className="pt-6">
                                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <benefit.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {benefit.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

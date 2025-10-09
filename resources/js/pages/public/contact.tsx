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
import { Textarea } from '@/components/ui/textarea';
import PublicLayout from '@/layouts/public-layout';
import { contact as contactImage } from '@/lib/exports';
import {
    type About,
    type CompanyInfo,
    type PopUp,
    type SocialNetwork,
} from '@/types/models';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';

interface ContactProps {
    abouts?: About[];
    socialnetwork?: SocialNetwork[];
    infos?: CompanyInfo[];
    popups?: PopUp[];
}

export default function Contact({
    abouts = [],
    socialnetwork = [],
    infos = [],
    popups = [],
}: ContactProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/send', {
            onSuccess: () => {
                reset();
            },
        });
    };

    const primaryInfo = infos[0];

    const contactInfo = [
        {
            icon: Phone,
            label: 'Phone',
            value: primaryInfo?.phone || '+1 901 297 7812',
            link: primaryInfo?.phone
                ? `tel:${primaryInfo.phone}`
                : 'tel:+19012977812',
        },
        {
            icon: Mail,
            label: 'Email',
            value: primaryInfo?.email || 'info@homepoolservice.com',
            link: primaryInfo?.email
                ? `mailto:${primaryInfo.email}`
                : 'mailto:info@homepoolservice.com',
        },
        {
            icon: MapPin,
            label: 'Address',
            value:
                primaryInfo?.address ||
                '2814 TREASURE ISLAND DR E. 38115 Memphis, Tennessee',
            link: null,
        },
        {
            icon: Clock,
            label: 'Business Hours',
            value: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
            link: null,
        },
    ];

    return (
        <PublicLayout
            currentPath="/contact"
            socialNetworks={socialnetwork}
            companyInfo={infos}
        >
            <Head title="Contact Us - Pool Service" />

            {/* Hero Section with Image */}
            <section className="relative -mt-16 h-[400px] overflow-hidden pt-16 md:h-[500px]">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${contactImage})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

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
                                    <MessageSquare className="mr-1 h-3 w-3" />
                                    Get In Touch
                                </Badge>
                            </motion.div>
                            <motion.h1
                                className="text-4xl font-bold text-white md:text-5xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Contact Us
                            </motion.h1>
                            <motion.p
                                className="text-lg text-white/90"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Have questions? We'd love to hear from you. Send
                                us a message and we'll respond as soon as
                                possible.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
                        {/* Contact Information */}
                        <div className="space-y-6 lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="mb-2 text-2xl font-bold">
                                    Get in Touch
                                </h2>
                                <p className="text-muted-foreground">
                                    We're here to help and answer any question
                                    you might have.
                                </p>
                            </motion.div>

                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={info.label}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <Card className="transition-shadow hover:shadow-md">
                                            <CardContent className="pt-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="rounded-lg bg-primary/10 p-2">
                                                        <info.icon className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="mb-1 text-sm font-medium text-muted-foreground">
                                                            {info.label}
                                                        </p>
                                                        {info.link ? (
                                                            <a
                                                                href={info.link}
                                                                className="text-sm font-medium break-words transition-colors hover:text-primary"
                                                            >
                                                                {info.value}
                                                            </a>
                                                        ) : (
                                                            <p className="text-sm font-medium break-words">
                                                                {info.value}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quick Info */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <Card className="border-primary/20 bg-primary/5">
                                    <CardContent className="pt-6">
                                        <h3 className="mb-2 font-semibold">
                                            Emergency Services
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Need urgent pool service? We offer
                                            24/7 emergency support for critical
                                            issues.
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>

                        <div className="space-y-3 lg:col-span-2">
                            {' '}
                            {/* Contact Form */}
                            <motion.div
                                className="lg:col-span-2"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <Card className="border-2">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">
                                            Send us a Message
                                        </CardTitle>
                                        <CardDescription>
                                            Fill out the form below and we'll
                                            get back to you within 24 hours.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                        >
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">
                                                        Name *
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
                                                        placeholder="John Doe"
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
                                                        placeholder="john@example.com"
                                                        required
                                                    />
                                                    {errors.email && (
                                                        <p className="text-sm text-destructive">
                                                            {errors.email}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">
                                                        Phone
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
                                                        placeholder="(555) 123-4567"
                                                    />
                                                    {errors.phone && (
                                                        <p className="text-sm text-destructive">
                                                            {errors.phone}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="subject">
                                                        Subject *
                                                    </Label>
                                                    <Input
                                                        id="subject"
                                                        value={data.subject}
                                                        onChange={(e) =>
                                                            setData(
                                                                'subject',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Service inquiry"
                                                        required
                                                    />
                                                    {errors.subject && (
                                                        <p className="text-sm text-destructive">
                                                            {errors.subject}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="message">
                                                    Message *
                                                </Label>
                                                <Textarea
                                                    id="message"
                                                    value={data.message}
                                                    onChange={(e) =>
                                                        setData(
                                                            'message',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Tell us about your pool service needs..."
                                                    rows={6}
                                                    required
                                                />
                                                {errors.message && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.message}
                                                    </p>
                                                )}
                                            </div>

                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="group w-full"
                                                disabled={processing}
                                            >
                                                {processing
                                                    ? 'Sending...'
                                                    : 'Send Message'}
                                                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            {/* Map Section */}
                            <motion.div
                                className="lg:col-span-2"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Card className="overflow-hidden border-2">
                                    <CardContent className="p-0">
                                        <div className="h-[320px] w-full">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.1579447075483!2d-89.90114842477824!3d35.05279006424082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x887f85907027c2e1%3A0xc72984200ae777fe!2s3529%20Tall%20Oaks%20Cir%2C%20Memphis%2C%20TN%2038118%2C%20USA!5e0!3m2!1sen!2stz!4v1740123462866!5m2!1sen!2stz"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="h-full w-full"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

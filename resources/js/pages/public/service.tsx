import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type About, type SocialNetwork, type CompanyInfo, type PopUp } from '@/types/models';
import {
    Droplets,
    Wrench,
    TestTube,
    Sparkles,
    Clock,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Calendar,
    ShoppingCart,
    type LucideIcon
} from 'lucide-react';
import { service as serviceImage } from '@/lib/exports';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ServiceProps {
    abouts?: About[];
    socialnetwork?: SocialNetwork[];
    infos?: CompanyInfo[];
    popups?: PopUp[];
}

interface ServiceData {
    id: number;
    slug: string;
    title: string;
    icon: string;
    description: string;
    features: string[];
    pricing: string;
}

const iconMap: Record<string, LucideIcon> = {
    Wrench,
    TestTube,
    Droplets,
    ShoppingCart,
    Calendar,
    ShieldCheck,
};

export default function Service({ abouts = [], socialnetwork = [], infos = [], popups = [] }: ServiceProps) {
    const [services, setServices] = useState<ServiceData[]>([]);

    useEffect(() => {
        fetch('/services.json')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error loading services:', error));
    }, []);

    const benefits = [
        {
            icon: Clock,
            title: 'Save Time',
            description: 'Let us handle the maintenance while you enjoy your pool',
        },
        {
            icon: ShieldCheck,
            title: 'Expert Care',
            description: 'Licensed professionals with years of experience',
        },
        {
            icon: Droplets,
            title: 'Perfect Water',
            description: 'Properly balanced chemistry for safe swimming',
        },
    ];

    return (
        <PublicLayout currentPath="/service" socialNetworks={socialnetwork} companyInfo={infos}>
            <Head title="Our Services - Pool Service" />

            {/* Hero Section with Image */}
            <section className="relative h-[400px] md:h-[500px] overflow-hidden -mt-16 pt-16">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${serviceImage})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="container mx-auto px-4 h-full relative">
                    <div className="flex items-center justify-center h-full">
                        <div className="max-w-3xl mx-auto text-center space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                                    <Droplets className="h-3 w-3 mr-1" />
                                    Professional Services
                                </Badge>
                            </motion.div>
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Our Services
                            </motion.h1>
                            <motion.p
                                className="text-lg text-white/90"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Comprehensive pool care solutions tailored to your needs
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-12 md:py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                className="flex items-start gap-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <benefit.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
                        <p className="text-muted-foreground text-lg">
                            Complete pool care services to keep your pool pristine
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {services.map((service, index) => {
                            const IconComponent = iconMap[service.icon] || Wrench;
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 flex flex-col h-full">
                                        <CardHeader>
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                                    <IconComponent className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                                                </div>
                                                <Badge variant="outline">{service.pricing}</Badge>
                                            </div>
                                            <CardTitle className="text-xl">{service.title}</CardTitle>
                                            <CardDescription>{service.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <ul className="space-y-2">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                        <span className="text-muted-foreground">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="bg-gradient-to-br from-primary to-primary/80 border-0 overflow-hidden">
                            <CardContent className="p-12 text-center relative">
                                <div className="absolute inset-0 bg-grid-white/10" />
                                <div className="relative space-y-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                                        Ready to Get Started?
                                    </h2>
                                    <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                                        Contact us today for a free consultation and custom service plan.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link href="/contact">
                                            <Button size="lg" variant="secondary" className="group">
                                                Request Service
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                        <Link href="/gallery">
                                            <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                                                View Our Work
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}

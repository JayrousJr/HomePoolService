import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PublicLayout from '@/layouts/public-layout';
import { hero } from '@/lib/exports';
import {
    type About,
    type CompanyInfo,
    type PopUp,
    type SocialNetwork,
} from '@/types/models';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    Calendar,
    Clock,
    Droplets,
    Shield,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    TestTube,
    Wrench,
    type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface HomeProps {
    abouts: About[];
    socialnetwork: SocialNetwork[];
    infos: CompanyInfo[];
    popups: PopUp[];
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

export default function Home({
    abouts,
    socialnetwork,
    infos,
    popups,
}: HomeProps) {
    const [typewriterText, setTypewriterText] = useState('');
    const [services, setServices] = useState<ServiceData[]>([]);
    const fullText = 'Professional Pool Services You Can Trust.';

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypewriterText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 80);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('/services.json')
            .then((response) => response.json())
            .then((data) => setServices(data))
            .catch((error) => console.error('Error loading services:', error));
    }, []);
    const features = [
        {
            icon: Droplets,
            title: 'Crystal Clear Water',
            description:
                'Professional cleaning and chemical balancing for pristine pool water.',
        },
        {
            icon: Shield,
            title: 'Quality Service',
            description:
                'Licensed and insured technicians with years of experience.',
        },
        {
            icon: Clock,
            title: 'Flexible Scheduling',
            description:
                'Weekly, bi-weekly, or monthly service plans to fit your needs.',
        },
        {
            icon: Award,
            title: 'Satisfaction Guaranteed',
            description:
                'We stand behind our work with a 100% satisfaction guarantee.',
        },
    ];

    return (
        <PublicLayout
            currentPath="/"
            socialNetworks={socialnetwork}
            companyInfo={infos}
        >
            <Head title="Home - Pool Service" />

            {/* Hero Section with Video */}
            <section className="relative -mt-16 h-screen min-h-[600px] overflow-hidden pt-16">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src={hero} type="video/mp4" />
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative container mx-auto h-full px-4">
                    <div className="flex h-full items-center justify-center">
                        <div className="mx-auto max-w-3xl space-y-6 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Badge className="border-white/30 bg-white/20 text-white hover:bg-white/30">
                                    <Sparkles className="mr-1 h-3 w-3" />
                                    Professional Pool Care Since 2020
                                </Badge>
                            </motion.div>
                            <motion.h1
                                className="min-h-[120px] text-4xl leading-tight font-bold text-white md:min-h-[160px] md:text-6xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {typewriterText}
                                <span className="animate-pulse">|</span>
                            </motion.h1>
                            <motion.p
                                className="text-lg text-white/90 md:text-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Keep your pool sparkling clean year-round with
                                our expert maintenance, cleaning, and repair
                                services.
                            </motion.p>
                            <motion.div
                                className="flex flex-col justify-center gap-4 pt-4 sm:flex-row"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <Link href="/contact">
                                    <Button
                                        size="lg"
                                        className="group bg-white text-primary hover:bg-white/90"
                                    >
                                        Request Service
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link href="/gallery">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white/30 bg-transparent text-white hover:bg-white/10"
                                    >
                                        View Our Work
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Services Section */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4">
                    <motion.div
                        className="mx-auto mb-12 max-w-2xl text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="mb-2 text-sm font-semibold text-primary uppercase">
                            Our Services
                        </p>
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            What We Do
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Professional pool services tailored to your needs
                        </p>
                    </motion.div>
                    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {services.slice(0, 3).map((service, index) => {
                            const IconComponent =
                                iconMap[service.icon] || Wrench;
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <Card className="group h-full border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col items-center space-y-4 text-center">
                                                <div className="rounded-lg bg-primary/10 p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                                                    <IconComponent className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                                                </div>
                                                <h3 className="text-xl font-semibold">
                                                    {service.title}
                                                </h3>
                                                <p className="text-sm leading-relaxed text-muted-foreground">
                                                    {service.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className="text-center">
                        <Link href="/service">
                            <Button size="lg" className="group">
                                View All Services
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* DIY Pool Care Tips */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4">
                    <motion.div
                        className="mx-auto mb-12 max-w-2xl text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="mb-2 text-sm font-semibold text-primary uppercase">
                            DIY Tips
                        </p>
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Pool Care Tips
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Simple maintenance tips you can do yourself
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: Droplets,
                                title: 'Check Water Level',
                                description:
                                    'Maintain water level at the middle of the skimmer opening for optimal circulation',
                            },
                            {
                                icon: TestTube,
                                title: 'Test Water Weekly',
                                description:
                                    'Test pH and chlorine levels weekly to ensure safe swimming conditions',
                            },
                            {
                                icon: Sparkles,
                                title: 'Skim Daily',
                                description:
                                    'Remove leaves and debris daily to prevent clogging and maintain cleanliness',
                            },
                            {
                                icon: Clock,
                                title: 'Run Pump Daily',
                                description:
                                    'Run your pool pump 8-12 hours daily to keep water circulating and filtered',
                            },
                        ].map((tip, index) => (
                            <motion.div
                                key={tip.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                }}
                            >
                                <Card className="h-full transition-shadow hover:shadow-lg">
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col items-center space-y-3 text-center">
                                            <div className="rounded-lg bg-primary/10 p-3">
                                                <tip.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold">
                                                {tip.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {tip.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4">
                    <motion.div
                        className="mx-auto mb-12 max-w-2xl text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Why Choose Us
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            We provide comprehensive pool services with
                            professionalism and care
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{
                                    opacity: 0,
                                    x: index % 2 === 0 ? -20 : 20,
                                }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <Card className="group h-full border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col items-center space-y-4 text-center">
                                            <div className="rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                                                <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                                            </div>
                                            <h3 className="text-lg font-semibold">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            {abouts && abouts.length > 0 && (
                <section className="bg-muted/30 py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                                About Us
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Learn more about our commitment to excellence
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                            {abouts.map((about) => (
                                <Card
                                    key={about.id}
                                    className="transition-shadow hover:shadow-lg"
                                >
                                    <CardContent className="pt-6">
                                        <h3 className="mb-3 text-xl font-semibold">
                                            {about.heading}
                                        </h3>
                                        <p className="leading-relaxed text-muted-foreground">
                                            {about.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Stats Section */}
            <section className="bg-primary py-16 text-primary-foreground md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
                        {[
                            { value: '500+', label: 'Pools Serviced' },
                            { value: '10+', label: 'Years Experience' },
                            { value: '98%', label: 'Client Satisfaction' },
                            { value: '24/7', label: 'Emergency Service' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <div className="mb-2 text-4xl font-bold md:text-5xl">
                                    {stat.value}
                                </div>
                                <div className="text-sm opacity-90 md:text-base">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="mx-auto mb-12 max-w-2xl text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="mb-2 text-sm font-semibold text-primary uppercase">
                            Testimonials
                        </p>
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            What Our Clients Say
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Don't just take our word for it - hear from our
                            satisfied customers
                        </p>
                    </motion.div>
                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                        {[
                            {
                                name: 'John Smith',
                                role: 'Homeowner',
                                rating: 5,
                                text: 'Excellent service! They transformed my green pool into a crystal-clear oasis. The team was professional, punctual, and very knowledgeable.',
                            },
                            {
                                name: 'Sarah Johnson',
                                role: 'Property Manager',
                                rating: 5,
                                text: 'We use them for all our properties. Reliable, affordable, and always go above and beyond. Highly recommend their maintenance packages!',
                            },
                            {
                                name: 'Michael Davis',
                                role: 'Resort Owner',
                                rating: 5,
                                text: 'Been working with them for 3 years. Best pool service company in the area. They handle everything from routine cleaning to major repairs.',
                            },
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                }}
                            >
                                <Card className="h-full transition-shadow hover:shadow-xl">
                                    <CardContent className="pt-6">
                                        <div className="mb-4 flex gap-1">
                                            {[...Array(testimonial.rating)].map(
                                                (_, i) => (
                                                    <Sparkles
                                                        key={i}
                                                        className="h-5 w-5 fill-primary text-primary"
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <p className="mb-6 text-muted-foreground italic">
                                            "{testimonial.text}"
                                        </p>
                                        <div className="border-t pt-4">
                                            <p className="font-semibold">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-primary/80">
                            <CardContent className="relative p-12 text-center">
                                <div className="bg-grid-white/10 absolute inset-0" />
                                <div className="relative space-y-6">
                                    <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
                                        Ready to Get Started?
                                    </h2>
                                    <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
                                        Contact us today for a free consultation
                                        and let us take care of your pool
                                        maintenance needs.
                                    </p>
                                    <Link href="/contact">
                                        <Button
                                            size="lg"
                                            variant="secondary"
                                            className="group"
                                        >
                                            Get Free Quote
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}

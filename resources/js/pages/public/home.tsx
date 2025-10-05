import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type About, type SocialNetwork, type CompanyInfo, type PopUp } from '@/types/models';
import { Droplets, Shield, Clock, Award, Sparkles, ArrowRight, Wrench, TestTube } from 'lucide-react';
import { useState, useEffect } from 'react';
import { hero } from '@/lib/exports';
import { motion } from 'framer-motion';

interface HomeProps {
    abouts: About[];
    socialnetwork: SocialNetwork[];
    infos: CompanyInfo[];
    popups: PopUp[];
}

export default function Home({ abouts, socialnetwork, infos, popups }: HomeProps) {
    const [typewriterText, setTypewriterText] = useState('');
    const fullText = 'Professional Pool Services You Can Trust';

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
    const features = [
        {
            icon: Droplets,
            title: 'Crystal Clear Water',
            description: 'Professional cleaning and chemical balancing for pristine pool water.',
        },
        {
            icon: Shield,
            title: 'Quality Service',
            description: 'Licensed and insured technicians with years of experience.',
        },
        {
            icon: Clock,
            title: 'Flexible Scheduling',
            description: 'Weekly, bi-weekly, or monthly service plans to fit your needs.',
        },
        {
            icon: Award,
            title: 'Satisfaction Guaranteed',
            description: 'We stand behind our work with a 100% satisfaction guarantee.',
        },
    ];

    return (
        <PublicLayout currentPath="/" socialNetworks={socialnetwork} companyInfo={infos}>
            <Head title="Home - Pool Service" />

            {/* Hero Section with Video */}
            <section className="relative h-screen min-h-[600px] overflow-hidden -mt-16 pt-16">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={hero} type="video/mp4" />
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="container mx-auto px-4 h-full relative">
                    <div className="flex items-center justify-center h-full">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Professional Pool Care Since 2020
                                </Badge>
                            </motion.div>
                            <motion.h1
                                className="text-4xl md:text-6xl font-bold text-white leading-tight min-h-[120px] md:min-h-[160px]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {typewriterText}
                                <span className="animate-pulse">|</span>
                            </motion.h1>
                            <motion.p
                                className="text-lg md:text-xl text-white/90"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Keep your pool sparkling clean year-round with our expert maintenance, cleaning, and repair services.
                            </motion.p>
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <Link href="/contact">
                                    <Button size="lg" className="group bg-white text-primary hover:bg-white/90">
                                        Request Service
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link href="/gallery">
                                    <Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10">
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
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-primary font-semibold text-sm uppercase mb-2">Our Services</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
                        <p className="text-muted-foreground text-lg">
                            Professional pool services tailored to your needs
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            {
                                icon: Wrench,
                                title: 'Pool Maintenance',
                                description: 'We do pool repairs, pool cleaning, pump and water circulation check to prevent bacteria and algae growth',
                            },
                            {
                                icon: TestTube,
                                title: 'Chemical Balancing',
                                description: 'We do chemical balancing, involves us handling all chemicals including Chlorine and all that your pool may need are balanced',
                            },
                            {
                                icon: Droplets,
                                title: 'Pool Opening',
                                description: 'Ladder and lights installation, pump and heater starting, pool brushing and shock treatment',
                            },
                        ].map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 h-full">
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                                <service.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                                            </div>
                                            <h3 className="font-semibold text-xl">{service.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link href="/service">
                            <Button size="lg" className="group">
                                View All Services
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* DIY Pool Care Tips */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-primary font-semibold text-sm uppercase mb-2">DIY Tips</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Pool Care Tips</h2>
                        <p className="text-muted-foreground text-lg">
                            Simple maintenance tips you can do yourself
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Droplets,
                                title: 'Check Water Level',
                                description: 'Maintain water level at the middle of the skimmer opening for optimal circulation',
                            },
                            {
                                icon: TestTube,
                                title: 'Test Water Weekly',
                                description: 'Test pH and chlorine levels weekly to ensure safe swimming conditions',
                            },
                            {
                                icon: Sparkles,
                                title: 'Skim Daily',
                                description: 'Remove leaves and debris daily to prevent clogging and maintain cleanliness',
                            },
                            {
                                icon: Clock,
                                title: 'Run Pump Daily',
                                description: 'Run your pool pump 8-12 hours daily to keep water circulating and filtered',
                            },
                        ].map((tip, index) => (
                            <motion.div
                                key={tip.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Card className="hover:shadow-lg transition-shadow h-full">
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col items-center text-center space-y-3">
                                            <div className="p-3 rounded-lg bg-primary/10">
                                                <tip.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold">{tip.title}</h3>
                                            <p className="text-sm text-muted-foreground">{tip.description}</p>
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
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
                        <p className="text-muted-foreground text-lg">
                            We provide comprehensive pool services with professionalism and care
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 h-full">
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                                <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                                            </div>
                                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">{feature.description}</p>
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
                <section className="py-16 md:py-24 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
                            <p className="text-muted-foreground text-lg">
                                Learn more about our commitment to excellence
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {abouts.map((about) => (
                                <Card key={about.id} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-6">
                                        <h3 className="text-xl font-semibold mb-3">{about.heading}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{about.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Stats Section */}
            <section className="py-16 md:py-24 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { value: '500+', label: 'Pools Serviced' },
                            { value: '15+', label: 'Years Experience' },
                            { value: '98%', label: 'Client Satisfaction' },
                            { value: '24/7', label: 'Emergency Service' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-primary font-semibold text-sm uppercase mb-2">Testimonials</p>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
                        <p className="text-muted-foreground text-lg">
                            Don't just take our word for it - hear from our satisfied customers
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                            >
                                <Card className="hover:shadow-xl transition-shadow h-full">
                                    <CardContent className="pt-6">
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Sparkles key={i} className="h-5 w-5 text-primary fill-primary" />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                                        <div className="border-t pt-4">
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
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
                                        Contact us today for a free consultation and let us take care of your pool maintenance needs.
                                    </p>
                                    <Link href="/contact">
                                        <Button size="lg" variant="secondary" className="group">
                                            Get Free Quote
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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

import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type About, type SocialNetwork, type CompanyInfo, type PopUp } from '@/types/models';
import { Award, Users, Heart, TrendingUp, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { about as aboutImage } from '@/lib/exports';
import { motion } from 'framer-motion';

interface AboutProps {
    abouts: About[];
    socialnetwork: SocialNetwork[];
    infos: CompanyInfo[];
    popups: PopUp[];
}

export default function AboutPage({ abouts, socialnetwork, infos, popups }: AboutProps) {
    const values = [
        {
            icon: Award,
            title: 'Excellence',
            description: 'We strive for excellence in every service we provide, ensuring your pool is always in top condition.',
        },
        {
            icon: Users,
            title: 'Customer First',
            description: 'Your satisfaction is our priority. We listen to your needs and deliver personalized solutions.',
        },
        {
            icon: Heart,
            title: 'Integrity',
            description: 'We believe in honest, transparent communication and fair pricing for all our services.',
        },
        {
            icon: TrendingUp,
            title: 'Continuous Improvement',
            description: 'We stay updated with the latest pool maintenance techniques and technologies.',
        },
    ];

    const stats = [
        { value: '500+', label: 'Happy Clients' },
        { value: '10+', label: 'Years Experience' },
        { value: '5000+', label: 'Pools Serviced' },
        { value: '100%', label: 'Satisfaction Rate' },
    ];

    return (
        <PublicLayout currentPath="/about" socialNetworks={socialnetwork} companyInfo={infos}>
            <Head title="About Us - Pool Service" />

            {/* Hero Section with Image */}
            <section className="relative h-[400px] md:h-[500px] overflow-hidden -mt-16 pt-16">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-bottom"
                    style={{ backgroundImage: `url(${aboutImage})` }}
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
                                    <Heart className="h-3 w-3 mr-1" />
                                    Our Story
                                </Badge>
                            </motion.div>
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                About Us
                            </motion.h1>
                            <motion.p
                                className="text-lg text-white/90"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Dedicated to keeping your pool crystal clear and perfectly maintained
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main About Content */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                        {/* Images Column */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <img
                                        src="/media/pool-clean.jpg"
                                        alt="Pool Service"
                                        className="rounded-lg shadow-lg w-full h-64 object-cover"
                                    />
                                    <div className="bg-primary text-primary-foreground p-6 rounded-lg text-center">
                                        <div className="text-4xl font-bold">15+</div>
                                        <div className="text-sm mt-2">Years Experience</div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <img
                                        src="/media/pool-maintenance.jpg"
                                        alt="Pool Maintenance"
                                        className="rounded-lg shadow-lg w-full h-80 object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Column */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div>
                                <p className="text-primary font-semibold text-sm uppercase mb-2">We Provide Quality Services</p>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Welcome to Family Pool Service established in 2020
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                                    FamilyPool Service is the Pool maintenance and construction service company in United States of America.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Family pool service also offers the service of Pool Constructions for commercial and home purpose,
                                    the high quality service for pool constructions for all sizes of pools according to the user client
                                    needs and we will install every requirement untill the pool becomes usable 100%
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Pool maintenance service is also available for you, regular pool cleaning service and Chemical sales
                                    too. FamilyPool Service offers the quality services for your neat and safe Pool
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Family Pool Service Provides a full, holistic solution for all our Swimming Pool needs Requirements
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Shield className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Quality Standards</h4>
                                        <p className="text-sm text-muted-foreground">Top-tier service guaranteed</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Expert Team</h4>
                                        <p className="text-sm text-muted-foreground">Certified technicians</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <span>100% Customer Satisfaction</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <span>Professional & Trained Staff</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <span>Flexible Service Plans</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    <span>Cost-Effective Solutions</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Database About Content */}
                    {abouts && abouts.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
                            {abouts.map((about, index) => (
                                <motion.div
                                    key={about.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 h-full">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                                                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-semibold">{about.heading}</h3>
                                                    <p className="text-muted-foreground leading-relaxed">{about.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
                        <p className="text-muted-foreground text-lg">
                            The principles that guide everything we do
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 h-full">
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                                <value.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                                            </div>
                                            <h3 className="font-semibold text-lg">{value.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 md:py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
                            <p className="text-muted-foreground text-lg">
                                Here's what sets us apart from the competition
                            </p>
                        </div>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        'Licensed and insured professionals',
                                        'State-of-the-art equipment',
                                        'Eco-friendly cleaning products',
                                        'Flexible scheduling options',
                                        'Competitive pricing',
                                        'Emergency repair services',
                                        'Free water testing',
                                        'Customer satisfaction guarantee',
                                    ].map((item) => (
                                        <div key={item} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-muted-foreground">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24">
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
                                        Ready to Work With Us?
                                    </h2>
                                    <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                                        Let's discuss your pool maintenance needs and create a custom service plan for you.
                                    </p>
                                    <Link href="/contact">
                                        <Button size="lg" variant="secondary" className="group">
                                            Get in Touch
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

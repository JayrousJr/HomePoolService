import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PublicLayout from '@/layouts/public-layout';
import { about as aboutImage, avatar } from '@/lib/exports';
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
    CheckCircle2,
    Heart,
    Shield,
    TrendingUp,
    Users,
} from 'lucide-react';

interface AboutProps {
    abouts: About[];
    socialnetwork: SocialNetwork[];
    infos: CompanyInfo[];
    popups: PopUp[];
}

export default function AboutPage({
    abouts,
    socialnetwork,
    infos,
    popups,
}: AboutProps) {
    const values = [
        {
            icon: Award,
            title: 'Excellence',
            description:
                'We strive for excellence in every service we provide, ensuring your pool is always in top condition.',
        },
        {
            icon: Users,
            title: 'Customer First',
            description:
                'Your satisfaction is our priority. We listen to your needs and deliver personalized solutions.',
        },
        {
            icon: Heart,
            title: 'Integrity',
            description:
                'We believe in honest, transparent communication and fair pricing for all our services.',
        },
        {
            icon: TrendingUp,
            title: 'Continuous Improvement',
            description:
                'We stay updated with the latest pool maintenance techniques and technologies.',
        },
    ];

    const stats = [
        { value: '500+', label: 'Happy Clients' },
        { value: '10+', label: 'Years Experience' },
        { value: '5000+', label: 'Pools Serviced' },
        { value: '100%', label: 'Satisfaction Rate' },
    ];

    const team = [
        {
            name: 'Amani Joel',
            role: 'Co-Founder & Manager',
            image: avatar,
            description:
                'Technical expert with over 15 years of experience in pool maintenance and construction.',
        },
        {
            name: 'Wailes Niyukuri',
            role: 'Co-Founder & Manager',
            image: avatar,
            description:
                'Business operations specialist ensuring top-quality service delivery to all clients.',
        },
    ];

    return (
        <PublicLayout
            currentPath="/about"
            socialNetworks={socialnetwork}
            companyInfo={infos}
        >
            <Head title="About Us - Pool Service" />

            {/* Hero Section with Image */}
            <section className="relative -mt-16 h-[400px] overflow-hidden pt-16 md:h-[500px]">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-bottom"
                    style={{ backgroundImage: `url(${aboutImage})` }}
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
                                    <Heart className="mr-1 h-3 w-3" />
                                    Our Story
                                </Badge>
                            </motion.div>
                            <motion.h1
                                className="text-4xl font-bold text-white md:text-5xl"
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
                                Dedicated to keeping your pool crystal clear and
                                perfectly maintained
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main About Content */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
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
                                        className="h-64 w-full rounded-lg object-cover shadow-lg"
                                    />
                                    <div className="rounded-lg bg-primary p-6 text-center text-primary-foreground">
                                        <div className="text-4xl font-bold">
                                            15+
                                        </div>
                                        <div className="mt-2 text-sm">
                                            Years Experience
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <img
                                        src="/media/pool-maintenance.jpg"
                                        alt="Pool Maintenance"
                                        className="h-80 w-full rounded-lg object-cover shadow-lg"
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
                                <p className="mb-2 text-sm font-semibold text-primary uppercase">
                                    We Provide Quality Services
                                </p>
                                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                                    Welcome to Home Pool Service established in
                                    2020
                                </h2>
                                <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                                    HomePool Service is the Pool maintenance and
                                    construction service company in United
                                    States of America.
                                </p>
                                <p className="mb-4 leading-relaxed text-muted-foreground">
                                    Home pool service also offers the service of
                                    Pool Constructions for commercial and home
                                    purpose, the high quality service for pool
                                    constructions for all sizes of pools
                                    according to the user client needs and we
                                    will install every requirement untill the
                                    pool becomes usable 100%
                                </p>
                                <p className="mb-4 leading-relaxed text-muted-foreground">
                                    Pool maintenance service is also available
                                    for you, regular pool cleaning service and
                                    Chemical sales too. HomePool Service offers
                                    the quality services for your neat and safe
                                    Pool
                                </p>
                                <p className="leading-relaxed text-muted-foreground">
                                    Home Pool Service Provides a full, holistic
                                    solution for all our Swimming Pool needs
                                    Requirements
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-semibold">
                                            Quality Standards
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Top-tier service guaranteed
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-primary/10 p-2">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-semibold">
                                            Expert Team
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Certified technicians
                                        </p>
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
                        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2">
                            {abouts.map((about, index) => (
                                <motion.div
                                    key={about.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <Card className="h-full border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                    <span className="text-2xl font-bold text-primary">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-semibold">
                                                        {about.heading}
                                                    </h3>
                                                    <p className="leading-relaxed text-muted-foreground">
                                                        {about.description}
                                                    </p>
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
            <section className="bg-muted/30 py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
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
                                <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-muted-foreground">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="mx-auto mb-12 max-w-2xl text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge className="mb-4">
                            <Users className="mr-1 h-3 w-3" />
                            Our Leadership
                        </Badge>
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Meet Our Co-Founders
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            The dedicated managers behind Home Pool Service
                        </p>
                    </motion.div>

                    <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                            >
                                <Card className="group h-full border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
                                    <CardContent className="flex flex-col items-center p-8 text-center">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Avatar className="mb-4 h-32 w-32 border-4 border-primary/20 transition-all duration-300 group-hover:border-primary">
                                                <AvatarImage
                                                    src={member.image}
                                                    alt={member.name}
                                                />
                                                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                                                    {member.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                        </motion.div>
                                        <h3 className="mb-2 text-2xl font-bold">
                                            {member.name}
                                        </h3>
                                        <Badge
                                            variant="secondary"
                                            className="mb-4"
                                        >
                                            {member.role}
                                        </Badge>
                                        <p className="leading-relaxed text-muted-foreground">
                                            {member.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="mx-auto mb-12 max-w-2xl text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Our Values
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            The principles that guide everything we do
                        </p>
                    </motion.div>
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
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
                                                <value.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                                            </div>
                                            <h3 className="text-lg font-semibold">
                                                {value.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {value.description}
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
            <section className="bg-muted/30 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                                Why Choose Us
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Here's what sets us apart from the competition
                            </p>
                        </div>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="grid gap-6 md:grid-cols-2">
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
                                        <div
                                            key={item}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                            <span className="text-muted-foreground">
                                                {item}
                                            </span>
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
                        <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary to-primary/80">
                            <CardContent className="relative p-12 text-center">
                                <div className="bg-grid-white/10 absolute inset-0" />
                                <div className="relative space-y-6">
                                    <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
                                        Ready to Work With Us?
                                    </h2>
                                    <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
                                        Let's discuss your pool maintenance
                                        needs and create a custom service plan
                                        for you.
                                    </p>
                                    <Link href="/contact">
                                        <Button
                                            size="lg"
                                            variant="secondary"
                                            className="group"
                                        >
                                            Get in Touch
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

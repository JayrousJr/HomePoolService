import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type CompanyInfo, type SocialNetwork } from '@/types/models';
import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    ExternalLink,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from 'lucide-react';
import AppLogoIcon from '../app-logo-icon';

interface FooterProps {
    socialNetworks?: SocialNetwork[];
    companyInfo?: CompanyInfo[];
}

const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/service', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
];

const getSocialIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('facebook')) return <Facebook className="h-4 w-4" />;
    if (lowerName.includes('twitter') || lowerName.includes('x'))
        return <Twitter className="h-4 w-4" />;
    if (lowerName.includes('instagram'))
        return <Instagram className="h-4 w-4" />;
    if (lowerName.includes('linkedin')) return <Linkedin className="h-4 w-4" />;
    return <ExternalLink className="h-4 w-4" />;
};

export default function Footer({
    socialNetworks = [],
    companyInfo = [],
}: FooterProps) {
    const primaryInfo = companyInfo[0];

    return (
        <footer className="border-t bg-muted/30">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div
                                className={cn(
                                    'flex h-14 w-14 items-center justify-center rounded-lg transition-colors',
                                )}
                            >
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg leading-none font-bold">
                                    Home Pool Service
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Professional Care
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Your trusted partner for professional pool
                            maintenance, cleaning, and repair services. We keep
                            your pool crystal clear year-round.
                        </p>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase">
                            Social Media
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Get in touch with us on our social media links any
                            time to get more information from us.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {socialNetworks.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="transition-colors hover:bg-primary hover:text-primary-foreground"
                                    >
                                        {getSocialIcon(social.name)}
                                        <span className="sr-only">
                                            {social.name}
                                        </span>
                                    </Button>
                                </a>
                            ))}
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="transition-colors hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Facebook className="h-4 w-4" />
                                    <span className="sr-only">Facebook</span>
                                </Button>
                            </a>
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="transition-colors hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Instagram className="h-4 w-4" />
                                    <span className="sr-only">Instagram</span>
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase">
                            Quick Links
                        </h3>
                        <nav className="flex flex-col gap-2">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <ArrowRight className="mr-2 -ml-5 h-3 w-3 opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100" />
                                    <span className="transition-transform group-hover:translate-x-1">
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider uppercase">
                            Get Connected
                        </h3>
                        {primaryInfo ? (
                            <div className="space-y-3">
                                {primaryInfo.address && (
                                    <div className="flex gap-3 text-sm">
                                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                                        <span className="text-muted-foreground">
                                            {primaryInfo.address}
                                        </span>
                                    </div>
                                )}
                                {primaryInfo.phone && (
                                    <a
                                        href={`tel:${primaryInfo.phone}`}
                                        className="group flex gap-3 text-sm transition-colors hover:text-primary"
                                    >
                                        <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary transition-transform group-hover:scale-110" />
                                        <span className="text-muted-foreground group-hover:text-foreground">
                                            {primaryInfo.phone}
                                        </span>
                                    </a>
                                )}
                                {primaryInfo.email && (
                                    <a
                                        href={`mailto:${primaryInfo.email}`}
                                        className="group flex gap-3 text-sm transition-colors hover:text-primary"
                                    >
                                        <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary transition-transform group-hover:scale-110" />
                                        <span className="break-all text-muted-foreground group-hover:text-foreground">
                                            {primaryInfo.email}
                                        </span>
                                    </a>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex gap-3 text-sm">
                                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                                    <span className="text-muted-foreground">
                                        3529 Tall Oaks Circle Apt 5, Memphis -
                                        TN
                                    </span>
                                </div>
                                <a
                                    href="tel:+19012977812"
                                    className="group flex gap-3 text-sm transition-colors hover:text-primary"
                                >
                                    <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                                    <span className="text-muted-foreground group-hover:text-foreground">
                                        +1 901 297 7812
                                    </span>
                                </a>
                                <Link href="/contact">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                    >
                                        Get in Touch
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Separator />

            {/* Bottom Bar */}
            <div className="mx-auto max-w-7xl px-4 py-6">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Home Pool Service. All
                        rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <a
                            href="https://legolas.in"
                            target="_blank"
                            className="transition-colors hover:text-foreground"
                        >
                            Developed by Legolas Tech
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

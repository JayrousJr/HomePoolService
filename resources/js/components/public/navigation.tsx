import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Menu, Phone, Waves } from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogoIcon from '../app-logo-icon';

interface NavigationProps {
    currentPath?: string;
}

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/service', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/request-service', label: 'Request Service' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Jobs' },
];

export default function Navigation({ currentPath = '/' }: NavigationProps) {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Set initial state
        setIsScrolled(window.scrollY > 20);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        if (path === '/') {
            return currentPath === '/';
        }
        return currentPath?.startsWith(path);
    };

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full transition-all duration-300',
                isScrolled
                    ? 'border-b bg-white shadow-sm backdrop-blur'
                    : 'border-transparent bg-transparent',
            )}
        >
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 transition-opacity hover:opacity-90"
                    >
                        <div
                            className={cn(
                                'flex h-12 w-12 items-center justify-center rounded-lg transition-colors',
                            )}
                        >
                            <AppLogoIcon className="size-10 fill-current text-[var(--foreground)] dark:text-white" />
                        </div>
                        {/* <div className="flex flex-col">
                            <span
                                className={cn(
                                    'text-lg leading-none font-bold transition-colors',
                                    isScrolled
                                        ? 'text-foreground'
                                        : 'text-white',
                                )}
                            >
                                Home Pool Service
                            </span>
                            <span
                                className={cn(
                                    'text-xs transition-colors',
                                    isScrolled
                                        ? 'text-muted-foreground'
                                        : 'text-white/80',
                                )}
                            >
                                Professional Care
                            </span>
                        </div> */}
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="gap-1">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <Link href={item.href}>
                                        <Button
                                            variant={
                                                isActive(item.href)
                                                    ? 'default'
                                                    : 'ghost'
                                            }
                                            className={cn(
                                                'transition-colors',
                                                isActive(item.href) &&
                                                    'shadow-sm',
                                                !isScrolled &&
                                                    !isActive(item.href) &&
                                                    'text-white hover:bg-white/20 hover:text-white',
                                            )}
                                        >
                                            {item.label}
                                        </Button>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* CTA Button - Desktop */}
                    <div className="hidden items-center gap-2 md:flex">
                        <Link href="/request-service">
                            <Button
                                size="sm"
                                className="gap-2 bg-white text-primary transition-colors hover:bg-white/90"
                            >
                                <Phone className="h-4 w-4" />
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    'transition-colors',
                                    !isScrolled &&
                                        'text-white hover:bg-white/20 hover:text-white',
                                )}
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[280px] sm:w-[350px]"
                        >
                            <div className="mt-6 flex flex-col gap-6">
                                {/* Mobile Logo */}
                                <div className="flex items-center gap-2 px-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                        <Waves className="h-6 w-6 text-primary-foreground" />
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

                                {/* Mobile Navigation Links */}
                                <nav className="flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                        >
                                            <Button
                                                variant={
                                                    isActive(item.href)
                                                        ? 'default'
                                                        : 'ghost'
                                                }
                                                className="w-full justify-start"
                                            >
                                                {item.label}
                                            </Button>
                                        </Link>
                                    ))}
                                </nav>

                                {/* Mobile CTA */}
                                <div className="space-y-2 border-t pt-4">
                                    <Link
                                        href="/request-service"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Button className="w-full gap-2">
                                            <Phone className="h-4 w-4" />
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

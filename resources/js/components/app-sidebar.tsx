import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Users,
    Briefcase,
    ListTodo,
    Mail,
    UserCheck,
    Eye,
    Settings,
    FolderTree,
    ClipboardList
} from 'lucide-react';
import AppLogo from './app-logo';
import admin from '@/routes/admin';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Admin Dashboard',
        href: admin.dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Clients',
        href: admin.clients.index(),
        icon: Users,
    },
    {
        title: 'Service Requests',
        href: admin.serviceRequests.index(),
        icon: ClipboardList,
    },
    {
        title: 'Tasks',
        href: admin.tasks.index(),
        icon: ListTodo,
    },
    {
        title: 'Messages',
        href: admin.messages.index(),
        icon: Mail,
    },
    {
        title: 'Job Applicants',
        href: admin.jobApplicants.index(),
        icon: UserCheck,
    },
    {
        title: 'Visitors',
        href: admin.visitors.index(),
        icon: Eye,
    },
    {
        title: 'Settings',
        href: '#',
        icon: Settings,
        items: [
            {
                title: 'Client Categories',
                href: admin.clientCategories.index(),
                icon: FolderTree,
            },
            {
                title: 'Company Info',
                href: admin.companyInfo.index(),
                icon: Briefcase,
            },
            {
                title: 'Social Networks',
                href: admin.socialNetworks.index(),
            },
            {
                title: 'About',
                href: admin.about.index(),
            },
            {
                title: 'Gallery',
                href: admin.gallery.index(),
            },
            {
                title: 'Pop-ups',
                href: admin.popups.index(),
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const userRoles = auth?.user?.roles || [];
    const isAdmin = userRoles.some((role: any) => ['Administrator', 'Manager', 'Technician'].includes(role.name));

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {isAdmin && <NavMain items={adminNavItems} />}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

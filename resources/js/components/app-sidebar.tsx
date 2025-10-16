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
import admin from '@/routes/admin';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Briefcase,
    CheckSquare,
    ClipboardList,
    FolderTree,
    LayoutGrid,
    ListTodo,
    Mail,
    Settings,
    UserCheck,
    UserCog,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

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
        title: 'Assigned Tasks',
        href: admin.assignedTasks.index(),
        icon: CheckSquare,
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
        title: 'User Management',
        href: admin.users.index(),
        icon: UserCog,
    },
    {
        title: 'Email Blast',
        href: admin.emailBlasts.index(),
        icon: Mail,
    },
    // {
    //     title: 'Visitors',
    //     href: admin.visitors.index(),
    //     icon: Eye,
    // },
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

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const userRoles = auth?.user?.roles || [];
    const isAdmin = userRoles.some((role: any) =>
        ['Administrator', 'Manager', 'Technician'].includes(role),
    );
    // const isTechnician = userRoles.some((role: any) => ['Technician'].includes(role));

    const isManager = userRoles.some((role: any) =>
        ['Administrator', 'Manager'].includes(role),
    );

    // Filter admin nav items based on role
    const filteredAdminNavItems = adminNavItems.filter((item) => {
        // Manager-only items
        const managerOnlyItems = [
            'Admin Dashboard',
            'Clients',
            'Service Requests',
            'Tasks',
            'Messages',
            'Job Applicants',
            'User Management',
            'Email Blast',
            'Visitors',
            'Settings',
        ];


        if (managerOnlyItems.includes(item.title)) {
            return isManager;
        }
        return true;
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {!isManager && <NavMain items={mainNavItems} />}
                {isAdmin && <NavMain items={filteredAdminNavItems} />}
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

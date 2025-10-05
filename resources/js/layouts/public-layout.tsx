import { type ReactNode, useEffect } from 'react';
import Navigation from '@/components/public/navigation';
import Footer from '@/components/public/footer';
import { type SocialNetwork, type CompanyInfo } from '@/types/models';
import { Toaster, toast } from 'sonner';
import { usePage } from '@inertiajs/react';

interface PublicLayoutProps {
    children: ReactNode;
    currentPath?: string;
    socialNetworks?: SocialNetwork[];
    companyInfo?: CompanyInfo[];
}

export default function PublicLayout({
    children,
    currentPath,
    socialNetworks = [],
    companyInfo = [],
}: PublicLayoutProps) {
    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string } | undefined;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="flex min-h-screen flex-col">
            <Toaster position="top-right" richColors />
            <Navigation currentPath={currentPath} />
            <main className="flex-1">{children}</main>
            <Footer socialNetworks={socialNetworks} companyInfo={companyInfo} />
        </div>
    );
}

import { Head } from '@inertiajs/react';
import { type About, type SocialNetwork, type CompanyInfo, type PopUp } from '@/types/models';

interface HomeProps {
    abouts: About[];
    socialnetwork: SocialNetwork[];
    infos: CompanyInfo[];
    popups: PopUp[];
}

export default function Home({ abouts, socialnetwork, infos, popups }: HomeProps) {
    return (
        <>
            <Head title="Home - Pool Service" />

            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Home Pool Service</h1>
                            <nav className="space-x-4">
                                <a href="/" className="hover:underline">Home</a>
                                <a href="/service" className="hover:underline">Services</a>
                                <a href="/gallery" className="hover:underline">Gallery</a>
                                <a href="/about" className="hover:underline">About</a>
                                <a href="/contact" className="hover:underline">Contact</a>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-5xl font-bold mb-4">Professional Pool Services</h2>
                        <p className="text-xl mb-8">Your trusted partner for pool maintenance and care</p>
                        <a
                            href="/service"
                            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                            Request Service
                        </a>
                    </div>
                </section>

                {/* About Section */}
                {abouts && abouts.length > 0 && (
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {abouts.map((about) => (
                                    <div key={about.id} className="prose max-w-none">
                                        <h3>{about.heading}</h3>
                                        <p>{about.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Company Info */}
                {infos && infos.length > 0 && (
                    <section className="py-16 bg-muted">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold mb-8 text-center">Contact Information</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {infos.map((info) => (
                                    <div key={info.id} className="text-center">
                                        <h3 className="font-semibold mb-2">{info.name}</h3>
                                        <p>{info.email}</p>
                                        <p>{info.phone}</p>
                                        <p>{info.address}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="border-t py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-center space-x-6 mb-4">
                            {socialnetwork && socialnetwork.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    {social.name}
                                </a>
                            ))}
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Home Pool Service. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

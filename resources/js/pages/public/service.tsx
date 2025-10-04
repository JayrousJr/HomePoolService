import { Head } from '@inertiajs/react';

export default function Service() {
    return (
        <>
            <Head title="Services" />
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-4xl font-bold mb-8">Our Services</h1>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 border rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Pool Cleaning</h3>
                            <p className="text-muted-foreground">Professional pool cleaning services to keep your pool sparkling clean.</p>
                        </div>
                        <div className="p-6 border rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Pool Maintenance</h3>
                            <p className="text-muted-foreground">Regular maintenance to ensure your pool stays in perfect condition.</p>
                        </div>
                        <div className="p-6 border rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Pool Repair</h3>
                            <p className="text-muted-foreground">Expert repair services for all types of pool issues.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

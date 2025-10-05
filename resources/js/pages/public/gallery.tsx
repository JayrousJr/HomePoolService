import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type About, type SocialNetwork, type CompanyInfo, type PopUp, type Gallery } from '@/types/models';
import { useState } from 'react';
import { X, ImageIcon, Maximize2 } from 'lucide-react';
import { gallery as galleryImage } from '@/lib/exports';
import { motion } from 'framer-motion';

interface GalleryProps {
    abouts: About[];
    socialnetwork: SocialNetwork[];
    infos: CompanyInfo[];
    popups: PopUp[];
    images: Gallery[];
}

export default function GalleryPage({ abouts, socialnetwork, infos, popups, images }: GalleryProps) {
    const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

    return (
        <PublicLayout currentPath="/gallery" socialNetworks={socialnetwork} companyInfo={infos}>
            <Head title="Gallery - Pool Service" />

            {/* Hero Section with Image */}
            <section className="relative h-[400px] md:h-[500px] overflow-hidden -mt-16 pt-16">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-bottom"
                    style={{ backgroundImage: `url(${galleryImage})` }}
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
                                    <ImageIcon className="h-3 w-3 mr-1" />
                                    Our Work
                                </Badge>
                            </motion.div>
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Gallery
                            </motion.h1>
                            <motion.p
                                className="text-lg text-white/90"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Browse through our pool maintenance and service projects
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    {images && images.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {images.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    className="group relative overflow-hidden rounded-lg cursor-pointer border-2 border-transparent hover:border-primary/50 shadow-md hover:shadow-xl transition-all duration-300"
                                    onClick={() => setSelectedImage(image)}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="aspect-square overflow-hidden bg-muted">
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt="Gallery"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                                            <span className="text-sm font-medium">
                                                {new Date(image.created_at).toLocaleDateString()}
                                            </span>
                                            <Maximize2 className="h-5 w-5" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No Images Yet</h3>
                            <p className="text-muted-foreground">
                                Gallery images will appear here soon.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Image Modal/Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-white hover:bg-white/20 hover:text-white"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="h-6 w-6" />
                    </Button>
                    <div className="relative max-w-7xl max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
                        <img
                            src={`/storage/${selectedImage.image_path}`}
                            alt="Gallery"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                            <p className="text-white text-sm bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
                                {new Date(selectedImage.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}

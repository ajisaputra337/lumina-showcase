"use client";

import { Navbar } from "~/app/_components/Navbar";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Heart } from "lucide-react";

export default function AboutPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const features = [
        {
            icon: <Shield className="text-azure" size={24} />,
            title: "Uncompromising Quality",
            description: "We don't just sell products; we curate excellence. Every item in our collection undergoes rigorous testing to ensure it meets our high standards."
        },
        {
            icon: <Zap className="text-azure" size={24} />,
            title: "Fast Innovation",
            description: "The digital world moves fast. LUMINA is always at the forefront, bringing you the latest in technology and smart lifestyle accessories."
        },
        {
            icon: <Globe className="text-azure" size={24} />,
            title: "Global Aesthetics",
            description: "Our designs are inspired by minimalist global trends, blending function with a premium look that fits any modern workspace."
        },
        {
            icon: <Heart className="text-azure" size={24} />,
            title: "User-Centric Design",
            description: "Everything we do starts with you. We focus on products that solve real problems while providing a delightful user experience."
        }
    ];

    return (
        <main className="min-h-screen bg-snow">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div {...fadeIn}>
                        <span className="text-xs font-bold text-azure uppercase tracking-[0.3em] mb-4 block">Our Story</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tighter">
                            Redefining the <br />
                            <span className="text-gradient">Digital Lifestyle.</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed">
                            LUMINA was born from a simple vision: to bridge the gap between high-performance technology and premium minimalist design.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-azure/5 rounded-full blur-3xl -z-10" />
            </section>

            {/* Content Sections */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                Curating the Future of <br />Premium Hardware.
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We believe that the tools you use every day should be as beautiful as they are functional. That's why we meticulously select each product in our collection, ensuring they deliver not just on specs, but on soul.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                From advanced peripherals to smart home essentials, LUMINA is your destination for hardware that elevates your daily routine and inspires your best work.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100">
                                <img
                                    src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2000&auto=format&fit=crop"
                                    alt="Brand Story"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating decorative card */}
                            <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-2xl hidden md:block border border-slate-200 shadow-xl">
                                <div className="text-azure font-bold text-2xl mb-1">99.9%</div>
                                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Satisfaction</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Philosophy</h2>
                        <div className="h-1.5 w-12 bg-azure mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:border-azure/30"
                            >
                                <div className="w-12 h-12 bg-azure/10 rounded-2xl flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-100 py-12 mt-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="text-xl font-bold text-gradient mb-4">LUMINA</div>
                    <p className="text-sm text-slate-400">© 2026 LUMINA. Crafting Tomorrow's Legacy Today.</p>
                </div>
            </footer>
        </main>
    );
}

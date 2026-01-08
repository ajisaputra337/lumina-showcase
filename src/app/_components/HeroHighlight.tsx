"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroHighlightProps {
    product: any;
    onView?: () => void;
}

export function HeroHighlight({ product, onView }: HeroHighlightProps) {
    if (!product) return null;

    return (
        <section className="max-w-7xl mx-auto px-4 py-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative h-[600px] rounded-[3rem] overflow-hidden group shadow-2xl"
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent flex flex-col justify-center p-12 md:p-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block bg-azure px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-6">
                            Featured Spotlight
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tighter">
                            {product.name}
                        </h2>
                        <p className="max-w-md text-slate-200 text-lg mb-10 leading-relaxed font-medium">
                            {product.description}
                        </p>
                        <button
                            onClick={onView}
                            className="btn-premium px-10 py-5 text-base font-bold flex items-center gap-3"
                        >
                            Discover the Excellence <ArrowRight size={20} />
                        </button>
                    </motion.div>
                </div>

                {/* Price Tag Floating */}
                <div className="absolute top-12 right-12 glass-card p-6 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl">
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Suggested Price</div>
                    <div className="text-slate-900 text-3xl font-bold">${product.price}</div>
                </div>
            </motion.div>
        </section>
    );
}

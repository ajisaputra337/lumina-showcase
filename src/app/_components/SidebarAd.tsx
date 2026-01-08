"use client";

import { motion } from "framer-motion";

interface SidebarAdProps {
    products: any[];
    side: "left" | "right";
    onProductClick?: (product: any) => void;
}

export function SidebarAd({ products, side, onProductClick }: SidebarAdProps) {
    if (!products || products.length === 0) return null;

    return (
        <aside className={`fixed top-[15vh] h-[70vh] z-40 hidden xl:flex flex-col gap-4 w-48 ${side === "left" ? "left-0" : "right-0"}`}>
            {products.map((product, idx) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2, duration: 1, ease: "circOut" }}
                    onClick={() => onProductClick?.(product)}
                    className={`flex-1 relative cursor-pointer group overflow-hidden border-y border-slate-100/50 ${side === "left"
                        ? "rounded-r-[2rem] border-r shadow-[20px_0_40px_-15px_rgba(0,0,0,0.1)]"
                        : "rounded-l-[2rem] border-l shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.1)]"
                        }`}
                >
                    {/* Background Image - The "Stretch" request */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    />

                    {/* Overlay for better readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Text Overlay - Premium Magazine Style */}
                    <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center gap-4 pointer-events-none">
                        <div className="w-8 h-[2px] bg-azure shadow-[0_0_10px_rgba(59,130,246,0.5)] mb-2" />

                        <span className="text-[12px] font-black text-white/60 uppercase tracking-[0.4em]">
                            {product.category.name}
                        </span>

                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-[18px] font-black text-white uppercase tracking-tight leading-none drop-shadow-lg">
                                {product.name}
                            </h3>
                            <span className="text-[14px] font-bold text-azure bg-azure/10 border border-azure/20 px-3 py-1 rounded-lg backdrop-blur-md">
                                ${product.price}
                            </span>
                        </div>
                    </div>

                    {/* Tooltip on hover */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-full ml-6" : "right-full mr-6"} opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none transform group-hover:translate-x-0 ${side === "left" ? "-translate-x-4" : "translate-x-4"}`}>
                        <div className="bg-white/90 backdrop-blur-md text-slate-900 border border-slate-100 text-[10px] font-black py-3 px-6 rounded-full shadow-2xl uppercase tracking-widest whitespace-nowrap">
                            View {product.name}
                        </div>
                    </div>
                </motion.div>
            ))}
        </aside>
    );
}

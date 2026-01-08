"use client";

import { api } from "~/trpc/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProductDetailsModal } from "./ProductDetailsModal";

export function ProductGrid() {
    const { data: products, isLoading } = api.product.getAll.useQuery({});
    const [detailProduct, setDetailProduct] = useState<any>(null);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 py-12">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-80 glass-card animate-pulse rounded-2xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                    <p className="text-slate-600 font-medium">Carefully curated for the modern digital life.</p>
                </div>
                <button className="text-sm font-semibold text-azure hover:underline">View All</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products?.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        onClick={() => setDetailProduct(product)}
                        className="group glass-card rounded-2xl overflow-hidden cursor-pointer border border-slate-50 hover:border-azure/30 transition-all hover:shadow-xl hover:shadow-azure/5"
                    >
                        <div className="relative h-48 overflow-hidden bg-slate-50">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-azure/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white/90 backdrop-blur-md text-azure text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                                    Quick View
                                </span>
                            </div>
                        </div>

                        <div className="p-4">
                            <p className="text-[10px] text-azure font-bold uppercase tracking-widest mb-1">{product.category.name}</p>
                            <h3 className="text-sm font-bold mb-1 truncate text-slate-800">{product.name}</h3>
                            <div className="flex justify-between items-center mt-3">
                                <span className="text-sm font-bold text-slate-900">${product.price}</span>
                                <span className="text-[10px] font-bold text-slate-300 group-hover:text-azure transition-colors">Details</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <ProductDetailsModal
                isOpen={!!detailProduct}
                product={detailProduct}
                onClose={() => setDetailProduct(null)}
            />
        </div>
    );
}

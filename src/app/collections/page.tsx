"use client";

import { Navbar } from "~/app/_components/Navbar";
import { api } from "~/trpc/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProductDetailsModal } from "../_components/ProductDetailsModal";
import { MOCK_PRODUCTS } from "~/lib/mock-data";

export default function CollectionsPage() {
    const { data: dbProducts, isLoading } = api.product.getAll.useQuery({});
    const products = (dbProducts && dbProducts.length > 0 ? dbProducts : MOCK_PRODUCTS) as any[];
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [detailProduct, setDetailProduct] = useState<any>(null);

    // Group products by category
    const categories = Array.from(new Set(products?.map(p => p.category.name)));
    const groupedProducts = categories.reduce((acc, category) => {
        acc[category] = products?.filter(p => p.category.name === category) ?? [];
        return acc;
    }, {} as Record<string, typeof products>);

    const filteredCategories = selectedCategory
        ? [selectedCategory]
        : categories;

    if (isLoading) {
        return (
            <main className="min-h-screen bg-snow">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-20 space-y-12">
                    {[1, 2].map(i => (
                        <div key={i} className="space-y-6">
                            <div className="h-10 w-48 bg-slate-100 animate-pulse rounded-lg" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[1, 2, 3, 4].map(j => (
                                    <div key={j} className="h-80 glass-card animate-pulse rounded-2xl" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-snow">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-16">
                <header className="mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-gradient mb-4"
                    >
                        Our Collections
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 font-medium"
                    >
                        Explore our curated series of premium technology and accessories.
                    </motion.p>
                </header>

                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === null
                            ? "bg-azure text-white shadow-lg shadow-azure/20"
                            : "bg-white border border-slate-100 text-slate-500 hover:border-azure/30"
                            }`}
                    >
                        All Series
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === category
                                ? "bg-azure text-white shadow-lg shadow-azure/20"
                                : "bg-white border border-slate-100 text-slate-500 hover:border-azure/30"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="space-y-24">
                    {filteredCategories.map((category, catIdx) => (
                        <motion.section
                            key={category}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest">{category}</h2>
                                <div className="h-[1px] flex-1 bg-slate-100" />
                                <span className="text-xs font-bold text-azure bg-azure/10 px-3 py-1 rounded-full">
                                    {groupedProducts[category]?.length} Items
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {groupedProducts[category]?.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        whileHover={{ y: -10 }}
                                        onClick={() => setDetailProduct(product)}
                                        className="group glass-card rounded-2xl overflow-hidden cursor-pointer"
                                    >
                                        <div className="relative h-64 overflow-hidden bg-slate-50">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold mb-1 text-slate-900 group-hover:text-azure transition-colors">{product.name}</h3>
                                            <p className="text-slate-500 text-sm mb-4 line-clamp-1">{product.description}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-bold text-slate-900">${product.price}</span>
                                                <span className="text-xs font-bold text-azure opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>

            <ProductDetailsModal
                isOpen={!!detailProduct}
                product={detailProduct}
                onClose={() => setDetailProduct(null)}
            />

            <footer className="border-t border-slate-100 py-12 mt-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="text-xl font-bold text-gradient mb-4">LUMINA</div>
                    <p className="text-sm text-slate-400">© 2026 LUMINA. Premium Product Showcase.</p>
                </div>
            </footer>
        </main>
    );
}

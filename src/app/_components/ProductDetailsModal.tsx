"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";

interface ProductDetailsModalProps {
    product: any;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] md:h-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-slate-900 shadow-sm transition-all"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-50 relative overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Decorative badge */}
                            <div className="absolute bottom-8 left-8">
                                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-azure uppercase tracking-widest shadow-sm">
                                    Premium Series
                                </span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                            <div className="mb-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs font-bold text-azure uppercase tracking-widest">
                                        {product.category.name}
                                    </span>
                                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                                    <span className="text-xs font-medium text-slate-400">ID: {product.id.slice(-8).toUpperCase()}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                    {product.name}
                                </h2>
                                <div className="text-3xl font-bold text-slate-900 mb-8">
                                    ${product.price}
                                </div>

                                <div className="space-y-6 mb-12">
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Description</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Specifications</h3>
                                        <ul className="grid grid-cols-2 gap-y-2 text-sm text-slate-600">
                                            {(() => {
                                                try {
                                                    const specs = product.specifications ? JSON.parse(product.specifications) : [];
                                                    if (specs.length === 0) return <li className="text-slate-400 italic">No specifications listed.</li>;
                                                    return specs.map((spec: string, i: number) => (
                                                        <li key={i} className="flex items-center gap-2 truncate pr-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-azure flex-shrink-0" /> {spec}
                                                        </li>
                                                    ));
                                                } catch (e) {
                                                    return <li className="text-slate-400 italic">Format error</li>;
                                                }
                                            })()}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <button className="flex-1 btn-premium py-4 font-bold flex items-center justify-center gap-2">
                                    Enquire Now <ArrowRight size={18} />
                                </button>
                                <button className="sm:px-8 py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                    <ShoppingBag size={18} /> Save to Gallery
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

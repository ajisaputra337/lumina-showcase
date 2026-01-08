"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Package, X } from "lucide-react";
import { ProductForm } from "./ProductForm";

export function AdminProductList() {
    const utils = api.useUtils();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    const { data: categories } = api.product.getCategories.useQuery();
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

    const { data: products, isLoading } = api.product.getAll.useQuery({});
    const deleteMutation = api.product.delete.useMutation({
        onSuccess: () => {
            void utils.product.getAll.invalidate();
        },
    });

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteMutation.mutateAsync({ id });
        }
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 text-azure">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azure"></div>
            </div>
        );
    }

    const filteredProducts = products?.filter(p =>
        selectedCategory === "ALL" || p.categoryId === selectedCategory
    ) ?? [];

    const heroProducts = products?.filter(p => p.isHeroHighlight) ?? [];
    const sidebarProducts = products?.filter(p => p.sidebarSide && !p.isHeroHighlight) ?? [];
    const regularProducts = filteredProducts.filter(p => !p.isHeroHighlight && !p.sidebarSide);

    const renderProductTable = (title: string, items: any[], badgeText?: string, badgeColor?: string) => (
        <div className="space-y-5">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">{title}</h2>
                {badgeText && (
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${badgeColor} shadow-sm border border-black/5`}>
                        {items.length} {badgeText}
                    </span>
                )}
            </div>
            <div className="glass-card rounded-[2rem] overflow-hidden border border-slate-100/50 shadow-xl shadow-slate-200/20">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/30 border-b border-slate-100/50">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Product Details</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50/50">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="px-8 py-20 text-center text-slate-300 italic text-sm">
                                    No entries in this department.
                                </td>
                            </tr>
                        ) : (
                            items.map((product) => (
                                <tr key={product.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-white overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <p className="font-bold text-slate-900 group-hover:text-azure transition-colors">{product.name}</p>
                                                    <span className="text-[9px] font-black text-azure bg-azure/5 px-2.5 py-1 rounded-lg uppercase tracking-tighter border border-azure/10">
                                                        {product.category.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs font-medium">
                                                    <span className="text-azure-600 font-bold">${product.price}</span>
                                                    <span className="text-slate-400 truncate max-w-[250px] font-normal italic">
                                                        {product.description}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-3 text-slate-400 hover:text-azure hover:bg-azure/5 rounded-2xl transition-all border border-transparent hover:border-azure/20"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Inventory</h1>
                    <p className="text-slate-500 font-medium">Manage your premium product showcase.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="flex-1 md:w-48 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-azure/20 focus:border-azure transition-all"
                    >
                        <option value="ALL">All Categories</option>
                        {categories?.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleAdd}
                        className="btn-premium flex items-center justify-center gap-2 py-3 px-8 text-sm"
                    >
                        <Plus size={18} /> Add Product
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="space-y-10">
                    {renderProductTable("Hero Spotlight", heroProducts, "Active", "bg-orange-100 text-orange-600")}
                    {renderProductTable("Sidebar Advertisements", sidebarProducts, "Ad Slots", "bg-azure text-white")}
                </div>
                <div>
                    {renderProductTable("Main Grid Collection", regularProducts, "Products", "bg-slate-900 text-white")}
                </div>
            </div>

            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            onClick={() => setIsFormOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg glass-card rounded-3xl p-8 bg-white max-h-[90vh] overflow-y-auto scrollbar-hide"
                        >
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-bold mb-6">
                                {editingProduct ? "Edit Product" : "Add New Product"}
                            </h2>
                            <ProductForm
                                product={editingProduct}
                                onSuccess={() => {
                                    setIsFormOpen(false);
                                    void utils.product.getAll.invalidate();
                                }}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

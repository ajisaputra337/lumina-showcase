"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductFormProps {
    product?: any;
    onSuccess: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
    const [name, setName] = useState(product?.name ?? "");
    const [description, setDescription] = useState(product?.description ?? "");
    const [price, setPrice] = useState(product?.price?.toString() ?? "0");
    const [image, setImage] = useState(product?.image ?? "");
    const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");

    // Derived placement state for UI
    const [placementType, setPlacementType] = useState<"COLLECTION" | "HERO" | "SIDEBAR">(() => {
        if (product?.isHeroHighlight) return "HERO";
        if (product?.sidebarSide) return "SIDEBAR";
        return "COLLECTION";
    });
    const [sidebarDirection, setSidebarDirection] = useState<"LEFT" | "RIGHT">(
        (product?.sidebarSide as "LEFT" | "RIGHT") ?? "LEFT"
    );
    const [specs, setSpecs] = useState<string[]>(() => {
        try {
            return product?.specifications ? JSON.parse(product.specifications) : [];
        } catch (e) {
            return [];
        }
    });
    const [isUploading, setIsUploading] = useState(false);

    const { data: categories } = api.product.getCategories.useQuery();

    const createMutation = api.product.create.useMutation({ onSuccess });
    const updateMutation = api.product.update.useMutation({ onSuccess });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            name,
            description,
            price: parseFloat(price),
            image,
            categoryId,
            sidebarSide: placementType === "SIDEBAR" ? sidebarDirection : null,
            isHeroHighlight: placementType === "HERO",
            specifications: specs.filter(s => s.trim() !== ""),
        };

        if (product) {
            await updateMutation.mutateAsync({ id: product.id, ...data });
        } else {
            await createMutation.mutateAsync(data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Placement Controls */}
            <div className="p-5 bg-slate-50/50 rounded-[2rem] border border-slate-100 mb-6 space-y-6">
                <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Placement Area</span>
                    <div className="flex bg-white rounded-2xl p-1.5 border border-slate-200">
                        {(["COLLECTION", "HERO", "SIDEBAR"] as const).map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setPlacementType(type)}
                                className={`flex-1 py-2.5 text-[10px] font-black rounded-xl transition-all ${placementType === type
                                    ? "bg-azure text-white shadow-lg shadow-azure/20"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                {type.replace("_", " ")}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {placementType === "SIDEBAR" && (
                        <motion.div
                            key="sidebar-opt"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sidebar Side</span>
                            <div className="flex bg-white rounded-2xl p-1.5 border border-slate-200 w-1/2">
                                {(["LEFT", "RIGHT"] as const).map((dir) => (
                                    <button
                                        key={dir}
                                        type="button"
                                        onClick={() => setSidebarDirection(dir)}
                                        className={`flex-1 py-1.5 text-[10px] font-black rounded-xl transition-all ${sidebarDirection === dir
                                            ? "bg-slate-900 text-white"
                                            : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        {dir}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {placementType === "HERO" && (
                    <div className="flex items-center gap-2 text-orange-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Active in Main Spotlight</span>
                    </div>
                )}
            </div>

            {/* Image Guides */}
            <div className="flex gap-3 mb-2 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex-shrink-0 px-3 py-1.5 bg-azure/5 border border-azure/10 rounded-lg">
                    <p className="text-[9px] font-bold text-azure uppercase tracking-wider">Collections: 1:1</p>
                </div>
                <div className="flex-shrink-0 px-3 py-1.5 bg-azure/5 border border-azure/10 rounded-lg">
                    <p className="text-[9px] font-bold text-azure uppercase tracking-wider">Hero: 16:9</p>
                </div>
                <div className="flex-shrink-0 px-3 py-1.5 bg-azure/5 border border-azure/10 rounded-lg">
                    <p className="text-[9px] font-bold text-azure uppercase tracking-wider">Sidebar: 9:16</p>
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Product Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-white shadow-sm focus:border-azure focus:ring-1 focus:ring-azure outline-none transition-all text-slate-900 placeholder:text-slate-300"
                    placeholder="e.g. Premium Wireless Headphones"
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-white shadow-sm focus:border-azure focus:ring-1 focus:ring-azure outline-none transition-all text-slate-900"
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-white shadow-sm focus:border-azure focus:ring-1 focus:ring-azure outline-none transition-all text-slate-900"
                    >
                        <option value="">Select Category</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specifications</label>
                    <button
                        type="button"
                        onClick={() => setSpecs([...specs, ""])}
                        className="text-[10px] font-bold text-azure hover:text-blue-700 transition-colors uppercase tracking-widest"
                    >
                        + Add Spec
                    </button>
                </div>
                <div className="space-y-2">
                    {specs.map((spec, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={spec}
                                onChange={(e) => {
                                    const newSpecs = [...specs];
                                    newSpecs[index] = e.target.value;
                                    setSpecs(newSpecs);
                                }}
                                placeholder="e.g. 4K OLED Display"
                                className="flex-1 px-4 py-2 rounded-xl border border-slate-100 bg-white shadow-sm focus:border-azure focus:ring-1 focus:ring-azure outline-none transition-all text-slate-900 text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setSpecs(specs.filter((_, i) => i !== index))}
                                className="px-3 py-2 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    {specs.length === 0 && (
                        <p className="text-[10px] text-slate-300 italic">No specifications added yet.</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Product Image</label>
                <div className="space-y-3">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="w-full flex items-center justify-center px-4 py-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-azure cursor-pointer transition-all text-sm text-slate-500 font-medium"
                            >
                                {isUploading ? "Processing..." : "Upload from Device"}
                            </label>
                        </div>
                        {image && (
                            <div className="w-12 h-12 rounded-lg border border-slate-100 overflow-hidden shadow-sm">
                                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-slate-300 text-[10px] font-bold uppercase tracking-tight">URL</span>
                        </div>
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-100 bg-white shadow-sm focus:border-azure focus:ring-1 focus:ring-azure outline-none transition-all text-slate-900 text-xs font-medium"
                            placeholder="Or paste an image URL..."
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-white shadow-sm focus:border-azure focus:ring-1 focus:ring-azure outline-none transition-all resize-none text-slate-900 placeholder:text-slate-300"
                    placeholder="Briefly explain what makes this product special..."
                />
            </div>

            <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending || isUploading}
                className="w-full btn-premium py-4 font-bold shadow-lg shadow-azure/20"
            >
                {createMutation.isPending || updateMutation.isPending ? "Saving..." : product ? "Update Product" : "Create Product"}
            </button>
        </form>
    );
}

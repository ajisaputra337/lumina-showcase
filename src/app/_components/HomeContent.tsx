"use client";

import { useState, useEffect } from "react";
import { Hero } from "./Hero";
import { SidebarAd } from "./SidebarAd";
import { HeroHighlight } from "./HeroHighlight";
import { ProductGrid } from "./ProductGrid";
import { ProductDetailsModal } from "./ProductDetailsModal";

interface HomeContentProps {
    sidebarLeft: any[];
    sidebarRight: any[];
    heroHighlight: any;
}

export function HomeContent({ sidebarLeft, sidebarRight, heroHighlight }: HomeContentProps) {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    // Scroll to top on refresh/mount to preserve the Hero impact
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative xl:px-48">
            {/* Sticky Sidebars */}
            <SidebarAd
                products={sidebarLeft}
                side="left"
                onProductClick={setSelectedProduct}
            />
            <SidebarAd
                products={sidebarRight}
                side="right"
                onProductClick={setSelectedProduct}
            />

            {/* Main Sections */}
            <Hero />

            {/* Highlights Area */}
            <div className="relative z-10 bg-white py-8 shadow-sm">
                <HeroHighlight
                    product={heroHighlight}
                    onView={() => setSelectedProduct(heroHighlight)}
                />
            </div>

            {/* Product Grid - Compact Version */}
            <div className="relative z-10">
                <ProductGrid />
            </div>

            {/* Global Modal for Landing Page */}
            <ProductDetailsModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
}

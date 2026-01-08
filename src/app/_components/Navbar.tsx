"use client";

import Link from "next/link";

export function Navbar() {
    return (
        <nav className="glass-nav">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-gradient">
                            LUMINA
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/collections" className="text-sm font-semibold hover:text-blue-600 transition-colors text-slate-700">Collections</Link>
                        <Link href="/about" className="text-sm font-semibold hover:text-blue-600 transition-colors text-slate-700">About</Link>
                    </div>

                    <div className="flex items-center space-x-5">
                        <Link href="/contact" className="btn-premium py-2 px-4 text-xs">
                            Inquire Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

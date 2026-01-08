import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-azure/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 text-center px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-blue-600 font-bold mb-4 tracking-widest uppercase text-xs"
                >
                    New Collection 2026
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
                >
                    Elevate Your <br /> Tech Style
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-slate-600 max-w-xl mx-auto mb-10 text-lg leading-relaxed font-medium"
                >
                    Explore our curation of premium hardware and limited edition accessories.
                    A showcase of cutting-edge technology designed for the modern pioneer.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <Link
                        href="/collections"
                        className="btn-premium px-8 py-3 rounded-full text-white font-bold transition-all hover:scale-105 active:scale-95"
                    >
                        Explore Collections
                    </Link>
                    <button className="px-6 py-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all text-sm font-semibold">
                        Contact Us
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

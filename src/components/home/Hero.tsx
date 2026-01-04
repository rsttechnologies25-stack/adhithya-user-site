"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
            {/* Background Decorative Elements (4D Effect) */}
            <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-20">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl">
                    {/* Badge Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center space-x-2 bg-red-50 text-primary px-4 py-1.5 rounded-full border border-red-100 mb-8"
                    >
                        <Zap size={14} className="fill-current" />
                        <span className="text-sm font-semibold tracking-wide uppercase">New Arrivals 2026 Out Now</span>
                    </motion.div>

                    {/* Heading Animation */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight"
                    >
                        Welcome to <br />
                        <span className="text-primary italic">Adhithya Electronics</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl"
                    >
                        Always Adhithya - Your Trusted Electronics Partner for Innovation and Quality.
                        Experience technology like never before with our premium range of products.
                    </motion.p>

                    {/* CTA Buttons with 4D-Max Glow/Scale */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 30px rgba(227, 30, 36, 0.4)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg flex items-center space-x-2 w-full sm:w-auto transition-shadow"
                        >
                            <span>Shop Now</span>
                            <ArrowRight size={20} />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full font-bold text-lg border-2 border-foreground hover:bg-foreground hover:text-white transition-colors w-full sm:w-auto"
                        >
                            Our Branches
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Hero Visual Element (Abstract or Product Collage) */}
            <div className="absolute bottom-0 right-0 w-full lg:w-1/2 h-2/3 lg:h-full pointer-events-none select-none">
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="relative"
                    >
                        {/* Immersive 4D Background Shapes */}
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] text-gray-100 fill-current">
                            <path d="M44.5,-76.3C57.1,-69.6,66.4,-56.3,73.5,-42.6C80.7,-28.9,85.6,-14.7,85.1,-0.3C84.7,14,78.8,28.7,70.9,42.1C63,55.4,53.2,67.6,40.5,74.7C27.9,81.8,12.5,84, -2.4,88.2C-17.3,92.5,-31.6,98.8,-44.6,94.3C-57.5,89.8,-69.1,74.5,-76.2,59.3C-83.3,44.1,-85.9,29,-87.3,14C-88.8,-1,-89.1,-15.9,-84.6,-29.9C-80.1,-43.9,-70.8,-57.1,-58.5,-64.1C-46.1,-71.2,-30.7,-72.1,-16.1,-75.4C-1.5,-78.7,13.1,-84.4,44.5,-76.3Z" transform="translate(100 100)" />
                        </svg>

                        {/* Placeholder for Product Image - Using Generator Image later */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    rotateY: [0, 10, 0]
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-white to-gray-200 rounded-3xl shadow-2xl overflow-hidden border border-white/50 backdrop-blur-xl"
                            >
                                <div className="absolute inset-0 bg-primary/5 p-8 flex flex-col justify-end">
                                    <div className="w-1/2 h-2 bg-primary rounded-full mb-2 opacity-50" />
                                    <div className="w-3/4 h-2 bg-primary rounded-full opacity-30" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

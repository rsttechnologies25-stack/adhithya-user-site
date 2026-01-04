"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function FounderQuote() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-5xl mx-auto bg-gray-50 rounded-[4rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-gray-100 shadow-sm">
                    {/* Founder Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-48 h-48 md:w-64 md:h-64 relative flex-shrink-0"
                    >
                        <div className="absolute inset-0 bg-primary rounded-full transform rotate-6 scale-105 opacity-10" />
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                            <Image
                                src="/founder.png"
                                alt="Mr. Chandran - Founder, Adhithya Electronics"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </motion.div>

                    {/* Quote Content */}
                    <div className="flex-1">
                        <Quote className="text-primary/20 w-16 h-16 mb-6" />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 italic leading-relaxed text-foreground">
                                "When I started Adhithya Electronics in 1995, my vision was simple - to provide our customers with genuine, quality products at prices they can afford. Our success is measured not in sales, but in smiles of satisfied customers."
                            </h3>
                            <div>
                                <span className="block text-xl font-black text-primary">Mr. Chandran</span>
                                <span className="block text-sm font-bold uppercase tracking-widest text-muted-foreground">Founder, Adhithya Electronics (Since 1995)</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Decorative background quote marks */}
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-[20rem] font-black text-black/[0.02] pointer-events-none select-none">
                "
            </div>
        </section>
    );
}

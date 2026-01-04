"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const res = await api.get("/products", {
                params: { limit: 3 }
            });
            setProducts(res.data.items);
        } catch (error) {
            console.error("Failed to fetch featured products", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-gray-50/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6"
                        >
                            Featured <span className="text-primary">Electronics</span>
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            whileInView={{ opacity: 1, width: 120 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-2 bg-primary rounded-full mb-8 shadow-lg shadow-primary/20"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-gray-500 text-xl font-medium"
                        >
                            Our most sought-after tech, meticulously engineered for performance.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/products"
                            className="group flex items-center space-x-3 bg-white px-8 py-5 rounded-3xl shadow-xl hover:bg-black transition-all duration-500 text-gray-900 hover:text-white"
                        >
                            <span className="font-black uppercase italic tracking-widest text-sm">View Catalog</span>
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-[2rem] p-8 h-[500px] animate-pulse">
                                <div className="bg-gray-100 rounded-3xl w-full h-64 mb-6" />
                                <div className="bg-gray-100 h-8 w-3/4 mb-4 rounded-xl" />
                                <div className="bg-gray-100 h-6 w-1/2 mb-10 rounded-xl" />
                                <div className="bg-gray-100 h-16 w-full rounded-2xl" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.15 }}
                            >
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

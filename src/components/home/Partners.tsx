"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Partner {
    id: string;
    name: string;
    logoUrl: string | null;
}

export default function Partners() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await api.get("/partners");
                setPartners(response.data || []);
            } catch (error) {
                console.error("Failed to fetch partners:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPartners();
    }, []);

    if (!loading && partners.length === 0) return null;

    return (
        <section className="py-20 bg-white border-y border-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Our Esteemed Partners</h2>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale group">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="w-24 h-8 bg-gray-100 animate-pulse rounded" />
                        ))
                    ) : (
                        partners.map((partner, index) => (
                            <motion.div
                                key={partner.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer flex items-center gap-2"
                            >
                                {partner.logoUrl ? (
                                    <img src={partner.logoUrl} alt={partner.name} className="h-8 md:h-12 w-auto object-contain" />
                                ) : (
                                    <span className="text-2xl md:text-3xl font-black">{partner.name}</span>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

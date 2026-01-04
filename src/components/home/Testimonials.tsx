"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Star, User } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import api from "@/lib/api";

interface Testimonial {
    id: string;
    name: string;
    role: string | null;
    content: string;
    rating: number;
    avatarUrl: string | null;
}

function TiltCard({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative"
        >
            {children}
        </motion.div>
    );
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await api.get("/testimonials");
                setTestimonials(response.data || []);
            } catch (error) {
                console.error("Failed to fetch testimonials:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    if (!loading && testimonials.length === 0) return null;

    return (
        <section className="py-24 bg-gray-50/50 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-extrabold mb-4"
                    >
                        What Our Customers Say
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1.5 bg-primary mx-auto rounded-full mb-6"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-pulse">
                                <div className="h-4 bg-gray-100 rounded w-1/4 mb-4" />
                                <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                                <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                                <div className="h-4 bg-gray-100 rounded w-3/4 mb-8" />
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full" />
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
                                        <div className="h-3 bg-gray-100 rounded w-1/3" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        testimonials.map((testimony, index) => (
                            <motion.div
                                key={testimony.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <TiltCard>
                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow relative overflow-hidden group">
                                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

                                        <div className="flex items-center space-x-1 mb-4" style={{ transform: "translateZ(50px)" }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={`${i < (testimony.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed italic" style={{ transform: "translateZ(30px)" }}>
                                            "{testimony.content}"
                                        </p>
                                        <div className="flex items-center space-x-4" style={{ transform: "translateZ(40px)" }}>
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform overflow-hidden">
                                                {testimony.avatarUrl ? (
                                                    <img src={testimony.avatarUrl} alt={testimony.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={24} />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-foreground">{testimony.name}</h4>
                                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{testimony.role || "Verified Customer"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

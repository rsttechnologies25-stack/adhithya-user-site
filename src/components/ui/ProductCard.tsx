"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ShoppingCart, Eye, Star, Heart } from "lucide-react";
import { MouseEvent } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Link from "next/link";

interface ProductCardProps {
    id: string;
    slug: string;
    name: string;
    basePrice: number;
    media: { url: string }[];
    category: { name: string };
    avgRating: number;
    reviewCount?: number;
    compareAtPrice?: number;
    variants?: { id: string; price: number }[];
}

export default function ProductCard({ id, slug, name, basePrice, media, category, avgRating, compareAtPrice, variants }: ProductCardProps) {
    const { addItem } = useCart();
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

    const handleAddToCart = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const stock = variants?.reduce((acc, v: any) => acc + (v.inventory?.quantity || 0), 0) ?? 999;
        addItem({
            id: variants?.[0]?.id || id,
            name,
            price: basePrice,
            quantity: 1,
            image: media?.[0]?.url || "/placeholder.png",
            stockAvailable: stock
        });
        toast.success(`Added ${name} to cart!`);
    };

    return (
        <Link href={`/products/${slug}`}>
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative cursor-pointer"
            >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-8" style={{ transform: "translateZ(50px)" }}>
                    <img
                        src={media?.[0]?.url || `https://source.unsplash.com/400x400?${name.split(' ').join(',')}`}
                        alt={name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Hover Actions */}
                    <div className="absolute inset-x-0 bottom-4 px-4 flex justify-center space-x-3 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                        <button
                            onClick={handleAddToCart}
                            className="bg-primary p-3 rounded-2xl text-white shadow-lg shadow-primary/20 hover:scale-110 transition-transform"
                        >
                            <ShoppingCart size={20} />
                        </button>
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white p-3 rounded-2xl text-gray-900 shadow-lg hover:scale-110 transition-transform"
                        >
                            <Eye size={20} />
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="bg-white p-3 rounded-2xl text-gray-400 hover:text-primary shadow-lg hover:scale-110 transition-transform"
                        >
                            <Heart size={20} />
                        </button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100" style={{ transform: "translateZ(30px)" }}>
                        {category?.name}
                    </div>

                    {/* Stock Alert Badge */}
                    {(() => {
                        const totalStock = variants?.reduce((acc, v: any) => acc + (v.inventory?.quantity || 0), 0) ?? 0;
                        if (totalStock > 0 && totalStock < 3) {
                            return (
                                <div className="absolute top-6 right-6 bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/30 animate-pulse" style={{ transform: "translateZ(30px)" }}>
                                    Fast Selling
                                </div>
                            );
                        }
                        if (totalStock === 0) {
                            return (
                                <div className="absolute top-6 right-6 bg-gray-900 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ transform: "translateZ(30px)" }}>
                                    Out of Stock
                                </div>
                            );
                        }
                        return null;
                    })()}
                </div>

                {/* Info */}
                <div className="p-8 bg-white relative z-10" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1.5">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold text-gray-700">{avgRating.toFixed(1)}</span>
                        </div>
                        {compareAtPrice && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md">SALE</span>
                        )}
                    </div>

                    <h3 className="font-extrabold text-xl mb-2 truncate group-hover:text-primary transition-colors duration-300">{name}</h3>

                    <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-black text-gray-900">₹{basePrice.toLocaleString('en-IN')}</span>
                        {compareAtPrice && (
                            <span className="text-sm text-gray-400 line-through">₹{compareAtPrice.toLocaleString('en-IN')}</span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="mt-6 w-full py-4 rounded-2xl bg-gray-900 text-white font-black uppercase italic tracking-widest text-[13px] hover:bg-primary transition-all duration-300 transform active:scale-95 shadow-xl shadow-black/5"
                    >
                        Add to Cart
                    </button>
                </div>

                {/* 4D Depth Shadow Effect */}
                <div className="absolute inset-0 pointer-events-none group-hover:bg-primary/[0.02] transition-colors" />
            </motion.div>
        </Link>
    );
}

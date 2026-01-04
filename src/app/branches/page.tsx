"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

interface Branch {
    id: string;
    slug: string;
    name: string;
    area: string;
    address: string;
    description: string;
    phone: string;
    email: string;
    openingTime: string;
    closingTime: string;
    workingDays: string;
    imageUrl: string;
    avgRating: number;
    reviewCount: number;
}

export default function BranchesPage() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            const res = await api.get("/branches");
            setBranches(res.data);
        } catch (error) {
            console.error("Failed to fetch branches", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 pt-10 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-12 bg-gray-200 rounded w-1/3 mb-8" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-3xl h-[400px]" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-900 font-medium">Branches</span>
                    </nav>

                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
                        Our <span className="text-primary">Branches</span>
                    </h1>
                    <div className="h-2 w-32 bg-primary rounded-full mb-6 shadow-lg shadow-primary/20" />
                    <p className="text-gray-500 text-xl max-w-2xl">
                        Visit any of our 3 premium showrooms across Chennai for an unparalleled shopping experience.
                    </p>
                </motion.div>

                {/* Branch Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {branches.map((branch, index) => (
                        <motion.div
                            key={branch.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/branches/${branch.slug}`}>
                                <div className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer">
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={branch.imageUrl}
                                            alt={branch.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-4 py-2 bg-primary text-white font-bold text-sm rounded-full">
                                                {branch.area}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                            {branch.name}
                                        </h3>

                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={i < Math.round(branch.avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">({branch.reviewCount} reviews)</span>
                                        </div>

                                        {/* Info */}
                                        <div className="space-y-3 text-sm text-gray-600">
                                            <div className="flex items-start gap-3">
                                                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                                <span className="line-clamp-2">{branch.address}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Phone size={16} className="text-primary flex-shrink-0" />
                                                <span>{branch.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Clock size={16} className="text-primary flex-shrink-0" />
                                                <span>{branch.openingTime} - {branch.closingTime} ({branch.workingDays})</span>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <button className="mt-6 w-full py-4 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-wider text-sm hover:bg-primary transition-all duration-300">
                                            View Details & Reviews
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

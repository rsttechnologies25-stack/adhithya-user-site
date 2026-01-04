"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    MapPin, Phone, Mail, Clock, Star, ChevronRight,
    Send, User, MessageSquare
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface Review {
    id: string;
    rating: number;
    title?: string;
    body?: string;
    adminReply?: string;
    adminReplyAt?: string;
    createdAt: string;
    user: { firstName?: string; lastName?: string };
}

interface Branch {
    id: string;
    slug: string;
    name: string;
    area: string;
    address: string;
    description: string;
    phone: string;
    email: string;
    googleMapsEmbed: string;
    openingTime: string;
    closingTime: string;
    workingDays: string;
    imageUrl: string;
    avgRating: number;
    reviewCount: number;
    reviews: Review[];
}

export default function BranchDetailPage() {
    const params = useParams();
    const { isAuthenticated, user } = useAuth();
    const [branch, setBranch] = useState<Branch | null>(null);
    const [loading, setLoading] = useState(true);
    const [reviewForm, setReviewForm] = useState({
        rating: 5,
        title: "",
        body: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchBranch();
    }, [params.slug]);

    const fetchBranch = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/branches/${params.slug}`);
            setBranch(res.data);
        } catch (error) {
            console.error("Failed to fetch branch", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error("Please login to submit a review");
            return;
        }

        setSubmitting(true);
        try {
            await api.post(`/branches/${params.slug}/reviews`, reviewForm);
            toast.success("Review submitted successfully!");
            setReviewForm({ rating: 5, title: "", body: "" });
            fetchBranch(); // Refresh to show new review
        } catch (error) {
            console.error("Failed to submit review", error);
            toast.error("Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 pt-10 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-96 bg-gray-200 rounded-3xl mb-8" />
                        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
                        <div className="h-48 bg-gray-200 rounded-3xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!branch) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Branch not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/branches" className="hover:text-primary">Branches</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">{branch.area}</span>
                </nav>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative h-80 md:h-96 rounded-3xl overflow-hidden mb-8"
                >
                    <img
                        src={branch.imageUrl}
                        alt={branch.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                        <span className="px-4 py-2 bg-primary text-white font-bold text-sm rounded-full mb-4 inline-block">
                            {branch.area}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{branch.name}</h1>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={i < Math.round(branch.avgRating) ? "fill-yellow-400 text-yellow-400" : "text-white/30"}
                                    />
                                ))}
                            </div>
                            <span className="text-white/80">({branch.reviewCount} reviews)</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Left: Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
                        >
                            <h2 className="text-2xl font-black text-gray-900 mb-4">About This Branch</h2>
                            <p className="text-gray-600 leading-relaxed">{branch.description}</p>
                        </motion.div>

                        {/* Google Maps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-2xl font-black text-gray-900">Location</h2>
                            </div>
                            <div className="h-80">
                                <iframe
                                    src={branch.googleMapsEmbed}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-fit"
                    >
                        <h2 className="text-2xl font-black text-gray-900 mb-6">Contact & Hours</h2>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <MapPin size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Address</p>
                                    <p className="text-gray-600 text-sm">{branch.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <Phone size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Phone</p>
                                    <a href={`tel:${branch.phone}`} className="text-primary hover:underline text-sm">{branch.phone}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <Mail size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                                    <a href={`mailto:${branch.email}`} className="text-primary hover:underline text-sm">{branch.email}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <Clock size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">Working Hours</p>
                                    <p className="text-gray-600 text-sm">{branch.openingTime} - {branch.closingTime}</p>
                                    <p className="text-gray-500 text-xs">{branch.workingDays}</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${branch.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all"
                        >
                            <MapPin size={18} />
                            Get Directions
                        </a>
                    </motion.div>
                </div>

                {/* Reviews Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
                >
                    <h2 className="text-2xl font-black text-gray-900 mb-8">Customer Reviews</h2>

                    {/* Review Form */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MessageSquare size={20} className="text-primary" />
                            Write a Review
                        </h3>

                        {isAuthenticated ? (
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                                                className="focus:outline-none"
                                            >
                                                <Star
                                                    size={28}
                                                    className={star <= reviewForm.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Review Title (optional)</label>
                                    <input
                                        type="text"
                                        value={reviewForm.title}
                                        onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Summarize your experience"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>

                                {/* Body */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Review (optional)</label>
                                    <textarea
                                        value={reviewForm.body}
                                        onChange={(e) => setReviewForm(prev => ({ ...prev, body: e.target.value }))}
                                        placeholder="Tell us about your experience at this branch..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
                                >
                                    <Send size={18} />
                                    {submitting ? "Submitting..." : "Submit Review"}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <User size={48} className="text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">Please login to write a review</p>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
                                >
                                    Login to Review
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {branch.reviews.length > 0 ? (
                            branch.reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-primary font-bold text-lg">
                                                {review.user.firstName?.[0] || "U"}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-bold text-gray-900">
                                                    {review.user.firstName || "User"} {review.user.lastName || ""}
                                                </span>
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            {review.title && (
                                                <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                                            )}
                                            {review.body && (
                                                <p className="text-gray-600">{review.body}</p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-2">
                                                {new Date(review.createdAt).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>

                                            {/* Admin Reply */}
                                            {review.adminReply && (
                                                <div className="mt-4 ml-4 pl-4 border-l-2 border-primary/30 bg-primary/5 rounded-r-xl p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded">Admin</span>
                                                        <span className="text-xs text-gray-400">
                                                            {review.adminReplyAt && new Date(review.adminReplyAt).toLocaleDateString('en-IN')}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 text-sm">{review.adminReply}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

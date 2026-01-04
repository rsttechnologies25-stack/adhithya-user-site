"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    ChevronRight,
    Star,
    Truck,
    Shield,
    Award,
    Minus,
    Plus,
    ShoppingCart,
    Heart,
    Share2,
    ChevronLeft,
} from "lucide-react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    slug: string;
    brand: string;
    basePrice: number;
    compareAtPrice?: number;
    shortDescription?: string;
    longDescription?: string;
    avgRating: number;
    reviewCount: number;
    media: { url: string }[];
    category: { name: string };
    variants: { id: string; title: string; price: number; inventory?: { quantity: number; lowStockThreshold: number } }[];
    specs: { key: string; value: string; group?: string }[];
    reviews: { id: string; rating: number; title?: string; body?: string; user?: { firstName: string; lastName: string } }[];
}

export default function ProductDetailPage() {
    const params = useParams();
    const { addItem } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

    useEffect(() => {
        fetchProduct();
    }, [params.slug]);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/products/${params.slug}`);
            setProduct(res.data);
            // Fetch related products
            const relatedRes = await api.get("/products", { params: { limit: 4 } });
            setRelatedProducts(relatedRes.data.items.filter((p: any) => p.id !== res.data.id).slice(0, 4));
        } catch (error) {
            console.error("Failed to fetch product", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        const totalStock = product.variants?.reduce((acc, v) => acc + (v.inventory?.quantity || 0), 0) ?? 999;

        addItem({
            id: product.variants?.[0]?.id || product.id,
            name: product.name,
            price: product.basePrice,
            quantity: Math.min(quantity, totalStock),
            image: product.media?.[0]?.url || "/placeholder.png",
            stockAvailable: totalStock
        });
        toast.success(`Items updated in cart!`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 pt-10 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="bg-gray-200 rounded-3xl aspect-square" />
                            <div className="space-y-6">
                                <div className="h-8 bg-gray-200 rounded w-3/4" />
                                <div className="h-6 bg-gray-200 rounded w-1/2" />
                                <div className="h-12 bg-gray-200 rounded w-1/3" />
                                <div className="h-40 bg-gray-200 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Product not found</p>
            </div>
        );
    }

    const images = product.media.length > 0
        ? product.media.map(m => m.url)
        : [`https://source.unsplash.com/800x800?${product.name.split(' ').join(',')}`];

    const tabs = [
        { id: "description", label: "Description" },
        { id: "specifications", label: "Specifications" },
        { id: "reviews", label: `Reviews (${product.reviewCount})` },
        { id: "shipping", label: "Shipping" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/products" className="hover:text-primary">Products</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </nav>

                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl p-8 aspect-square flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden relative"
                        >
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain"
                            />
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}
                        </motion.div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${selectedImage === idx
                                            ? "border-primary shadow-lg shadow-primary/20"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <p className="text-sm font-bold text-primary uppercase tracking-widest">{product.brand}</p>
                                {(() => {
                                    const totalStock = product.variants?.reduce((acc, v) => acc + (v.inventory?.quantity || 0), 0) ?? 0;
                                    if (totalStock > 0 && totalStock < 3) {
                                        return <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse shadow-lg shadow-orange-500/20">Fast Selling</span>
                                    }
                                    if (totalStock === 0) {
                                        return <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Out of Stock</span>
                                    }
                                    return null;
                                })()}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{product.name}</h1>

                            {/* Ratings */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={i < Math.round(product.avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-black text-gray-900">₹{product.basePrice.toLocaleString('en-IN')}</span>
                            {product.compareAtPrice && (
                                <span className="text-xl text-gray-400 line-through">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                            )}
                            {product.compareAtPrice && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                                    {Math.round((1 - product.basePrice / product.compareAtPrice) * 100)}% OFF
                                </span>
                            )}
                        </div>

                        {/* Short Description */}
                        {product.shortDescription && (
                            <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>
                        )}

                        {/* Variants */}
                        {product.variants && product.variants.length > 1 && (
                            <div className="space-y-3">
                                <p className="font-semibold text-gray-900">Variants:</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            className="px-4 py-2 border-2 border-primary bg-primary/10 text-primary font-semibold rounded-xl"
                                        >
                                            {variant.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="flex items-center gap-4">
                            <p className="font-semibold text-gray-900">Quantity:</p>
                            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    className="p-3 hover:bg-gray-100 transition-colors"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="px-6 py-3 font-bold text-gray-900 min-w-[60px] text-center">{quantity}</span>
                                <button
                                    onClick={() => {
                                        const totalStock = product.variants?.reduce((acc, v) => acc + (v.inventory?.quantity || 0), 0) ?? 999;
                                        if (quantity < totalStock) {
                                            setQuantity(prev => prev + 1);
                                        } else {
                                            toast.error(`Only ${totalStock} items available in stock`);
                                        }
                                    }}
                                    className="p-3 hover:bg-gray-100 transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            {(() => {
                                const totalStock = product.variants?.reduce((acc, v) => acc + (v.inventory?.quantity || 0), 0) ?? 0;
                                if (totalStock > 0 && totalStock < 10) {
                                    return <span className="text-sm font-bold text-orange-600">Only {totalStock} left!</span>
                                }
                                return null;
                            })()}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-3 bg-primary text-white py-4 px-8 rounded-2xl font-black uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-3 bg-gray-900 text-white py-4 px-8 rounded-2xl font-black uppercase tracking-wider hover:bg-gray-800 transition-all shadow-lg shadow-black/10 active:scale-95">
                                Buy Now
                            </button>
                        </div>

                        {/* Wishlist & Share */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                                <Heart size={20} />
                                <span className="text-sm font-medium">Add to Wishlist</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                                <Share2 size={20} />
                                <span className="text-sm font-medium">Share</span>
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-gray-600">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Truck size={18} className="text-primary" />
                                </div>
                                <span className="text-sm font-medium">Fast Shipping</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Shield size={18} className="text-primary" />
                                </div>
                                <span className="text-sm font-medium">Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Award size={18} className="text-primary" />
                                </div>
                                <span className="text-sm font-medium">1-Year Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm mb-20">
                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-100 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-8 py-5 font-semibold whitespace-nowrap transition-all relative ${activeTab === tab.id
                                    ? "text-primary"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                        {activeTab === "description" && (
                            <div className="prose max-w-none">
                                <p className="text-gray-600 leading-relaxed">
                                    {product.longDescription || product.shortDescription || "No description available for this product."}
                                </p>
                            </div>
                        )}

                        {activeTab === "specifications" && (
                            <div className="space-y-4">
                                {product.specs && product.specs.length > 0 ? (
                                    <table className="w-full">
                                        <tbody>
                                            {product.specs.map((spec, idx) => (
                                                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                                                    <td className="px-4 py-3 font-semibold text-gray-900 w-1/3">{spec.key}</td>
                                                    <td className="px-4 py-3 text-gray-600">{spec.value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-gray-500">No specifications available.</p>
                                )}
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="space-y-6">
                                {product.reviews && product.reviews.length > 0 ? (
                                    product.reviews.map((review) => (
                                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                                                    />
                                                ))}
                                            </div>
                                            {review.title && <h4 className="font-bold text-gray-900 mb-1">{review.title}</h4>}
                                            {review.body && <p className="text-gray-600">{review.body}</p>}
                                            {review.user && (
                                                <p className="text-sm text-gray-400 mt-2">— {review.user.firstName} {review.user.lastName}</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                                )}
                            </div>
                        )}

                        {activeTab === "shipping" && (
                            <div className="prose max-w-none text-gray-600">
                                <p className="mb-4">We offer fast and reliable shipping across India:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li><strong>Free Shipping:</strong> Orders above ₹1000</li>
                                    <li><strong>Standard Shipping:</strong> ₹40 for orders below ₹1000</li>
                                    <li><strong>Delivery Time:</strong> 3-7 business days</li>
                                    <li><strong>Express Delivery:</strong> Available in select cities</li>
                                </ul>
                                <p className="mt-4">All orders are carefully packaged to ensure your products arrive in perfect condition.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recommended Products */}
                {relatedProducts.length > 0 && (
                    <section>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">Recommended Products</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="aspect-square bg-gray-50 p-4 flex items-center justify-center">
                                        <img
                                            src={product.media?.[0]?.url || `https://source.unsplash.com/400x400?${product.name.split(' ').join(',')}`}
                                            alt={product.name}
                                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                                        <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    className={i < Math.round(product.avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                                                />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">{product.avgRating.toFixed(1)}</span>
                                        </div>
                                        <p className="text-primary font-black">₹{product.basePrice.toLocaleString('en-IN')}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

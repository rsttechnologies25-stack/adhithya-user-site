"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Filter,
    ChevronDown,
    Grid,
    List,
    Search,
    ShoppingBag,
    Heart,
    Star,
    ChevronRight,
    SlidersHorizontal,
    X
} from "lucide-react";
import api from "@/lib/api";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface Product {
    id: string;
    name: string;
    slug: string;
    brand: string;
    basePrice: number;
    compareAtPrice?: number;
    avgRating: number;
    reviewCount: number;
    media: { url: string }[];
    category: { name: string };
    variants: { id: string; price: number }[];
}

export default function ProductCatalogPage() {
    const { addItem } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        categories: [] as string[],
        brands: [] as string[],
    });
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("relevance");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        fetchFilters();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategories, selectedBrands, searchQuery, sortBy]);

    const fetchFilters = async () => {
        try {
            const res = await api.get("/products/filters");
            setFilters({
                categories: res.data.categories.map((c: any) => c.name),
                brands: res.data.brands,
            });
        } catch (error) {
            console.error("Failed to fetch filters", error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params: any = {
                sort: sortBy,
            };
            if (selectedCategories.length > 0) params.categories = selectedCategories.join(',');
            if (selectedBrands.length > 0) params.brands = selectedBrands.join(',');
            if (searchQuery) params.query = searchQuery;

            const res = await api.get("/products", { params });
            setProducts(res.data.items);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleAddToCart = (product: Product) => {
        addItem({
            id: product.variants?.[0]?.id || product.id,
            name: product.name,
            price: product.basePrice,
            quantity: 1,
            image: product.media?.[0]?.url || "/placeholder.png",
        });
        toast.success(`Added ${product.name} to cart!`);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                    <span className="hover:text-primary cursor-pointer">Home</span>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">All Products</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900">Filters</h3>
                                <SlidersHorizontal size={18} className="text-gray-400" />
                            </div>

                            {/* Categories */}
                            <div className="mb-8">
                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Categories</h4>
                                <div className="space-y-3">
                                    {filters.categories.map((cat) => (
                                        <label key={cat} className="flex items-center group cursor-pointer">
                                            <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-primary border-primary' : 'border-gray-200 group-hover:border-primary/50'
                                                }`}>
                                                {selectedCategories.includes(cat) && <div className="w-2 h-2 bg-white rounded-full shadow-sm" />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => toggleCategory(cat)}
                                            />
                                            <span className={`text-sm tracking-tight transition-colors ${selectedCategories.includes(cat) ? 'text-primary font-semibold' : 'text-gray-600'
                                                }`}>
                                                {cat}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Brands */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Brands</h4>
                                <div className="space-y-3">
                                    {filters.brands.map((brand) => (
                                        <label key={brand} className="flex items-center group cursor-pointer">
                                            <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all ${selectedBrands.includes(brand) ? 'bg-primary border-primary' : 'border-gray-200 group-hover:border-primary/50'
                                                }`}>
                                                {selectedBrands.includes(brand) && <div className="w-2 h-2 bg-white rounded-full shadow-sm" />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleBrand(brand)}
                                            />
                                            <span className={`text-sm tracking-tight transition-colors ${selectedBrands.includes(brand) ? 'text-primary font-semibold' : 'text-gray-600'
                                                }`}>
                                                {brand}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center bg-gray-50 rounded-xl p-1">
                                    <button className="p-2 bg-white shadow-sm rounded-lg text-primary"><Grid size={18} /></button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600"><List size={18} /></button>
                                </div>

                                <select
                                    className="bg-gray-50 border-none rounded-xl text-sm font-medium py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="relevance">Relevance</option>
                                    <option value="price_low_high">Price: Low to High</option>
                                    <option value="price_high_low">Price: High to Low</option>
                                    <option value="newest">Newest Arrivals</option>
                                </select>
                            </div>

                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setShowMobileFilters(true)}
                                className="lg:hidden flex items-center justify-center space-x-2 bg-primary text-white py-3 rounded-xl font-bold"
                            >
                                <Filter size={18} />
                                <span>Filters</span>
                            </button>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="bg-white rounded-2xl p-4 h-[400px] animate-pulse">
                                        <div className="bg-gray-100 rounded-xl w-full h-56 mb-4" />
                                        <div className="bg-gray-100 h-6 w-3/4 mb-2 rounded" />
                                        <div className="bg-gray-100 h-4 w-1/2 mb-6 rounded" />
                                        <div className="bg-gray-100 h-10 w-full rounded-xl" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <Link key={product.id} href={`/products/${product.slug}`}>
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl hover:shadow-primary/5 border border-gray-100 transition-all duration-500 relative overflow-hidden cursor-pointer"
                                            >
                                                {/* Product Image */}
                                                <div className="relative h-64 w-full bg-gray-50 rounded-2xl overflow-hidden mb-5">
                                                    <img
                                                        src={product.media?.[0]?.url || `https://source.unsplash.com/400x400?${product.name.split(' ').join(',')}`}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    <button
                                                        onClick={(e) => e.preventDefault()}
                                                        className="absolute top-3 right-3 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-primary transition-colors shadow-sm opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 duration-300"
                                                    >
                                                        <Heart size={18} />
                                                    </button>
                                                    {product.compareAtPrice && (
                                                        <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-[10px] font-black italic uppercase rounded-full shadow-lg shadow-primary/20">
                                                            Sale
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="px-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{product.brand}</span>
                                                        <div className="flex items-center space-x-1">
                                                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                                            <span className="text-xs font-bold text-gray-700">{product.avgRating.toFixed(1)}</span>
                                                        </div>
                                                    </div>
                                                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>

                                                    <div className="flex items-end justify-between mt-4">
                                                        <div className="flex flex-col">
                                                            {product.compareAtPrice && (
                                                                <span className="text-xs text-gray-400 line-through mb-0.5">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                                                            )}
                                                            <span className="text-lg font-black text-primary">₹{product.basePrice.toLocaleString('en-IN')}</span>
                                                        </div>

                                                        <button
                                                            onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                                                            className="p-3 bg-gray-900 text-white rounded-2xl group-hover:bg-primary transition-all duration-300 shadow-lg shadow-black/5 hover:scale-110"
                                                        >
                                                            <ShoppingBag size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center">
                                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Search size={32} className="text-gray-400" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-xl mb-2">No products found</h3>
                                        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            <AnimatePresence>
                {showMobileFilters && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMobileFilters(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[60] p-8 lg:hidden"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-2xl font-black italic uppercase text-gray-900">Filters</h3>
                                <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Mobile Categories */}
                            <div className="mb-10">
                                <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-6 border-b border-gray-100 pb-2">Categories</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {filters.categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => toggleCategory(cat)}
                                            className={`text-xs font-bold py-3 px-4 rounded-xl border-2 transition-all ${selectedCategories.includes(cat) ? 'border-primary bg-primary text-white' : 'border-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Brands */}
                            <div>
                                <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-6 border-b border-gray-100 pb-2">Brands</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {filters.brands.map(brand => (
                                        <button
                                            key={brand}
                                            onClick={() => toggleBrand(brand)}
                                            className={`text-xs font-bold py-3 px-4 rounded-xl border-2 transition-all ${selectedBrands.includes(brand) ? 'border-primary bg-primary text-white' : 'border-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {brand}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="absolute bottom-8 left-8 right-8 bg-black text-white py-5 rounded-2xl font-black uppercase italic tracking-widest shadow-xl"
                            >
                                Apply Filters
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

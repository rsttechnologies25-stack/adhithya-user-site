"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trash2,
    Minus,
    Plus,
    ChevronRight,
    CreditCard,
    ShieldCheck,
    ShoppingBag,
    ArrowRight,
    CheckCircle2,
    Lock
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CartPage() {
    const { items, addItem, removeItem, totalItems, totalPrice } = useCart();
    const { user } = useAuth();
    const [promoCode, setPromoCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("credit_card");

    const shippingCost = totalPrice <= 1000 ? 0 : 40.00;
    const taxRate = 0.08;
    const tax = totalPrice * taxRate;
    const total = totalPrice + shippingCost + tax;

    const handleUpdateQuantity = (item: any, delta: number) => {
        if (item.quantity + delta <= 0) {
            removeItem(item.id);
        } else {
            addItem({ ...item, quantity: delta });
        }
    };

    const steps = [
        { name: "Cart Review", status: "completed" },
        { name: "Shipping Details", status: "current" },
        { name: "Payment Method", status: "upcoming" },
        { name: "Order Confirmation", status: "upcoming" },
    ];

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-black/5 border border-gray-100 text-center max-w-sm w-full"
                >
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={40} className="text-gray-200" />
                    </div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900 mb-2">Cart is empty</h2>
                    <p className="text-gray-500 mb-8 font-medium">Add some items to get started!</p>
                    <Link
                        href="/products"
                        className="w-full inline-flex items-center justify-center space-x-3 bg-primary text-white py-4 rounded-2xl font-black uppercase italic tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <span>View Products</span>
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-10">
                    Cart & <span className="text-primary">Checkout</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Cart & Forms */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Your Cart */}
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                                <span className="text-sm font-medium text-gray-500">{items.length} Items</span>
                            </div>

                            <div className="space-y-6">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                <img src={item.image || "/placeholder.png"} alt={item.name} className="w-full h-full object-contain p-2" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                                                <p className="text-primary font-black text-sm">₹{item.price.toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-6">
                                            <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item, -1)}
                                                    className="p-2 hover:bg-gray-50 transition-colors text-gray-500"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item, 1)}
                                                    className="p-2 hover:bg-gray-50 transition-colors text-gray-500"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}

                                <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-sm font-medium text-gray-500">Subtotal:</span>
                                        <span className="text-xl font-black text-primary">₹{totalPrice.toLocaleString('en-IN')}</span>
                                    </div>
                                    <Link href="/products" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </section>

                        {/* Promo Code */}
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Have a Promo Code?</h2>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Enter promo code"
                                    className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary transition-all">
                                    Apply
                                </button>
                            </div>
                        </section>

                        {/* Shipping Info */}
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-8">Shipping Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">First Name</label>
                                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Doe" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Address Line 1</label>
                                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="123 Main St" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Address Line 2 (Optional)</label>
                                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Apt, Suite, Bldg" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">City</label>
                                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Techville" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">State / Province</label>
                                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="CA" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Zip Code</label>
                                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="90210" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="(555) 123-4567" />
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-8">Payment Method</h2>
                            <div className="space-y-6">
                                <label className="flex items-center p-4 rounded-2xl border-2 border-primary bg-primary/5 cursor-pointer">
                                    <input type="radio" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} className="w-5 h-5 text-primary focus:ring-primary border-gray-300" />
                                    <div className="ml-4 flex items-center space-x-3">
                                        <CreditCard className="text-primary" size={20} />
                                        <span className="font-bold text-gray-900">Credit Card</span>
                                    </div>
                                </label>

                                <div className="pl-9 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Card Number</label>
                                        <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="XXXX XXXX XXXX XXXX" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Card Holder Name</label>
                                        <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="John Doe" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Expiry Date</label>
                                            <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="MM/YY" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">CVV</label>
                                            <input type="text" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="XXX" />
                                        </div>
                                    </div>
                                </div>

                                <label className="flex items-center p-4 rounded-2xl border-2 border-gray-100 hover:border-primary/30 transition-colors cursor-pointer">
                                    <input type="radio" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="w-5 h-5 text-primary focus:ring-primary border-gray-300" />
                                    <div className="ml-4 flex items-center space-x-3 text-gray-500">
                                        <span className="font-bold">PayPal</span>
                                    </div>
                                </label>

                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-gray-400">
                                        <Lock size={14} />
                                        <span className="text-xs font-medium">Securely processed by Adhithya Electronics.</span>
                                    </div>
                                    <div className="flex items-center space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Summary & Progress */}
                    <div className="space-y-8">

                        {/* Order Summary */}
                        <section className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 border border-primary/10 sticky top-24 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />

                            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900 mb-8 border-b border-gray-100 pb-4">
                                Order <span className="text-primary">Summary</span>
                            </h2>

                            <div className="space-y-6">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-gray-900 font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-gray-500">Shipping</span>
                                    {shippingCost === 0 ? (
                                        <span className="text-green-500 font-bold">FREE</span>
                                    ) : (
                                        <span className="text-gray-900 font-bold">₹{shippingCost.toLocaleString('en-IN')}</span>
                                    )}
                                </div>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-gray-500">Tax (8%)</span>
                                    <span className="text-gray-900 font-bold">₹{tax.toLocaleString('en-IN')}</span>
                                </div>

                                <div className="pt-6 border-t-2 border-dashed border-gray-100">
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-black uppercase italic tracking-widest text-gray-400">Total</span>
                                        <span className="text-3xl font-black text-primary">₹{total.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <button className="w-full mt-8 py-5 rounded-2xl bg-primary text-white font-black uppercase italic tracking-widest shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                                    Continue to Payment
                                </button>
                            </div>
                        </section>

                        {/* Checkout Progress */}
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-8">Checkout Progress</h3>
                            <div className="space-y-8 relative">
                                <div className="absolute left-[13px] top-2 bottom-6 w-0.5 bg-gray-100" />
                                {steps.map((step, i) => (
                                    <div key={step.name} className="flex items-center space-x-4 relative">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ring-4 ring-white z-10 ${step.status === 'completed' ? 'bg-primary text-white' :
                                            step.status === 'current' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            {step.status === 'completed' ? <CheckCircle2 size={16} /> : <span className="text-[10px] font-black">{i + 1}</span>}
                                        </div>
                                        <span className={`text-sm font-bold ${step.status === 'completed' ? 'text-primary' :
                                            step.status === 'current' ? 'text-gray-900' : 'text-gray-400'
                                            }`}>
                                            {step.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Security Badge */}
                        <div className="flex flex-col items-center justify-center px-4 py-8 border-2 border-dashed border-gray-200 rounded-3xl">
                            <ShieldCheck size={32} className="text-green-500 mb-3" />
                            <p className="text-xs font-bold text-gray-900 mb-1">Your information is safe and secure.</p>
                            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                                <Lock size={10} className="text-gray-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">SSL Secured</span>
                                <div className="w-10 h-3 bg-gray-200 rounded flex items-center justify-center">
                                    <div className="w-6 h-1.5 bg-green-500/20 rounded-full" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

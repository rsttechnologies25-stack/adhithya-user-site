"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ChevronRight, Award, Users, Target, Heart,
    CheckCircle, Calendar, Store, Headphones, Shield
} from "lucide-react";
import Link from "next/link";

const milestones = [
    { year: "1995", title: "Foundation", description: "Adhithya Electronics was established by Mr. Chandran in Chennai with a vision to provide quality electronics at honest prices." },
    { year: "2000", title: "Growing Trust", description: "Expanded our product range to include computer peripherals and home appliances, becoming a one-stop electronics destination." },
    { year: "2010", title: "Second Branch", description: "Opened our Kolathur branch to serve more customers across North Chennai with the same commitment to quality." },
    { year: "2015", title: "20 Years Strong", description: "Celebrated two decades of customer trust and satisfaction, serving thousands of happy families." },
    { year: "2020", title: "Digital Expansion", description: "Launched our online presence to reach customers beyond Chennai while maintaining our core values." },
    { year: "2024", title: "Third Branch", description: "Opened our Villivakkam branch, continuing our mission to bring quality electronics closer to customers." },
];

const values = [
    { icon: Award, title: "Original Products", description: "We sell only genuine, original products from authorized brands with proper company warranty." },
    { icon: Target, title: "Best Prices", description: "Competitive pricing without compromising on quality - our promise since 1995." },
    { icon: Headphones, title: "After-Sales Support", description: "Responsive customer service and support even after your purchase is complete." },
    { icon: Shield, title: "Warranty Assured", description: "All products come with proper manufacturer warranty for your peace of mind." },
];

const stats = [
    { value: "29+", label: "Years of Excellence" },
    { value: "3", label: "Showrooms" },
    { value: "50K+", label: "Happy Customers" },
    { value: "100%", label: "Genuine Products" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">About Us</span>
                </nav>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl overflow-hidden mb-16"
                >
                    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-primary/80 py-20 px-8 md:px-16">
                        <div className="max-w-3xl">
                            <span className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-full mb-6 inline-block">
                                Since 1995
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                                The Promise of<br />
                                <span className="text-primary">Adhithya Electronics</span>
                            </h1>
                            <p className="text-xl text-white/80 leading-relaxed">
                                Original Quality Products At Best Price
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* About Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                            Who We Are
                        </h2>
                        <div className="h-2 w-24 bg-primary rounded-full" />
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We, here at Adhithya Electronics, always strive to sell original and quality products to our valuable customers with the best price possible. This has been our aim since the inception of our establishment.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Established in <strong className="text-gray-900">1995</strong> by <strong className="text-gray-900">Mr. Chandran</strong>, Adhithya Electronics is a popular and prominent showroom in Chennai. We are dealing with Electronic Components, Computer Peripherals and Home Appliances.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Selling quality and original products at the best price possible, Adhithya Electronics is a one-stop destination for all Electronic & Electrical Goods and is built upon the pillars of <strong className="text-primary">Customer Satisfaction</strong> & <strong className="text-primary">After-Sales Support</strong>.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
                    >
                        <h3 className="text-2xl font-black text-gray-900 mb-6">Our Commitments</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-100 rounded-full">
                                    <CheckCircle size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Only Original and Quality Products</h4>
                                    <p className="text-gray-600 text-sm">Every product we sell is 100% genuine and sourced from authorized distributors.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-100 rounded-full">
                                    <CheckCircle size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Best Possible Price with Proper Company Warranty</h4>
                                    <p className="text-gray-600 text-sm">Competitive pricing backed by manufacturer warranty on all products.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-100 rounded-full">
                                    <CheckCircle size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Responsive After-Sales Support and Service</h4>
                                    <p className="text-gray-600 text-sm">Our commitment to you doesn't end at the sale. We're here for support whenever you need it.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                            <div className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Our Values */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Our Core Values</h2>
                        <div className="h-2 w-24 bg-primary rounded-full mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all"
                            >
                                <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-4">
                                    <value.icon size={28} className="text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Our Journey Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Our Journey</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">From a single showroom in 1995 to serving thousands of customers across Chennai</p>
                        <div className="h-2 w-24 bg-primary rounded-full mx-auto mt-4" />
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200" />

                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm inline-block max-w-md">
                                            <div className="text-2xl font-black text-primary mb-2">{milestone.year}</div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h3>
                                            <p className="text-gray-600 text-sm">{milestone.description}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex w-12 h-12 bg-primary text-white rounded-full items-center justify-center font-bold shadow-lg shadow-primary/30 z-10">
                                        <Calendar size={20} />
                                    </div>
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Founder Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mb-20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="text-center">
                            <div className="w-40 h-40 md:w-48 md:h-48 relative rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20 shadow-xl">
                                <Image
                                    src="/founder.png"
                                    alt="Mr. Chandran - Founder, Adhithya Electronics"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900">Mr. Chandran</h3>
                            <p className="text-primary font-semibold">Founder</p>
                        </div>
                        <div className="md:col-span-2 space-y-4">
                            <h2 className="text-3xl font-black text-gray-900">From the Founder's Desk</h2>
                            <div className="h-2 w-24 bg-primary rounded-full" />
                            <p className="text-gray-600 leading-relaxed">
                                "When I started Adhithya Electronics in 1995, my vision was simple - to provide our customers with genuine, quality products at prices they can afford. Nearly three decades later, this vision remains at the heart of everything we do."
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                "We believe that every customer deserves not just a product, but a promise - a promise of quality, honesty, and unwavering support. This is the Adhithya way, and it will always be."
                            </p>
                            <p className="text-gray-900 font-bold italic">
                                "Our success is measured not in sales, but in smiles of satisfied customers."
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary to-red-600 rounded-3xl p-8 md:p-12 text-center text-white"
                >
                    <h2 className="text-3xl md:text-4xl font-black mb-4">Visit Our Showrooms</h2>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">
                        Experience our commitment to quality firsthand at any of our 3 showrooms across Chennai.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/branches"
                            className="px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:bg-gray-100 transition-all"
                        >
                            View All Branches
                        </Link>
                        <Link
                            href="/products"
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20"
                        >
                            Browse Products
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";

const milestones = [
    {
        year: "1995",
        title: "The Beginning",
        description: "Adhithya Electronics was founded by Mr. Chandran in Chennai's Perambur, with a vision to provide quality electronics at honest prices.",
    },
    {
        year: "2005",
        title: "A Decade of Trust",
        description: "Celebrated 10 years of customer satisfaction, expanding our product range to computer peripherals and home appliances.",
    },
    {
        year: "2015",
        title: "Growing Footprint",
        description: "Opened our second branch in Kolathur, bringing our commitment to quality and service closer to more customers across North Chennai.",
    },
    {
        year: "2024",
        title: "Digital & Physical Expansion",
        description: "Launched our modern e-commerce platform and opened our third showroom in Villivakkam, combining online convenience with in-store experience.",
    },
];

export default function Timeline() {
    return (
        <section className="py-24 bg-gray-50/30 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-extrabold mb-4"
                    >
                        Our Journey: <span className="text-primary">Key Milestones</span>
                    </motion.h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200" />

                    <div className="space-y-24">
                        {milestones.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`relative flex items-center justify-between w-full ${index % 2 === 0 ? "flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content Card */}
                                <div className="w-[45%] bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <span className="text-primary font-black text-2xl mb-2 block">{item.year}</span>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                </div>

                                {/* Center Circle */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-sm z-10" />

                                {/* Empty space for balance */}
                                <div className="w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MouseEvent } from "react";

const stats = [
    { label: "Years of Excellence", value: "29+" },
    { label: "Happy Customers", value: "50K+" },
    { label: "Quality Products", value: "1000+" },
    { label: "Genuine Guarantee", value: "100%" },
];

function StatCard({ label, value, index }: { label: string; value: string; index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center group hover:bg-primary transition-colors duration-500 relative cursor-pointer"
        >
            <span
                className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:text-white transition-colors duration-500"
                style={{ transform: "translateZ(50px)" }}
            >
                {value}
            </span>
            <span
                className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white/80 transition-colors duration-500"
                style={{ transform: "translateZ(30px)" }}
            >
                {label}
            </span>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl pointer-events-none" />
        </motion.div>
    );
}

export default function AboutUs() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
                                Who We Are: <br />
                                <span className="text-primary">Our Story</span>
                            </h2>
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    Established in <strong className="text-primary">1995</strong> by <strong className="text-primary">Mr. Chandran</strong>, Adhithya Electronics is a popular and prominent showroom in Chennai. We are dealing with Electronic Components, Computer Peripherals and Home Appliances.
                                </p>
                                <p>
                                    We always strive to sell original and quality products to our valuable customers with the best price possible. This has been our aim since the inception of our establishment. We hope and aim to build our business purely on Customer Satisfaction.
                                </p>
                                <p>
                                    Selling quality and original products at the best price possible, Adhithya Electronics is a one-stop destination for all Electronic & Electrical Goods and is built upon the pillars of <strong className="text-primary">Customer Satisfaction</strong> & <strong className="text-primary">After-Sales Support</strong>.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Grid */}
                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-2 gap-6 md:gap-8">
                            {stats.map((stat, index) => (
                                <StatCard key={stat.label} {...stat} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

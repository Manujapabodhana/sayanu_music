"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

const checklistItems = [
    "Seamless live video & audio integration.",
    "Integrated payment & management systems.",
    "Robust student & teacher portals.",
];

export default function Mission() {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <div className="inline-block bg-blue-50 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                        Our Mission
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold font-outfit text-[#0F172A] leading-tight">
                        Bridging the gap between traditional learning and the digital age.
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        Founded with a vision to democratize high-quality education, EduStream provides the tools for institutions to transition effortlessly to a hybrid or fully remote model. Our platform is built on stability, low latency, and intuitive management.
                    </p>

                    <ul className="space-y-4">
                        {checklistItems.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-gray-700">
                                <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                    <Check size={12} strokeWidth={3} />
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Image Content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-teal-50">
                        {/* Using the generated image */}
                        <Image
                            src="/assets/hero_illustration.png"
                            alt="Team collaborating in modern office"
                            width={600}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="absolute -bottom-6 -left-6 bg-blue-900 text-white p-6 rounded-xl shadow-xl max-w-[200px]"
                    >
                        <div className="text-4xl font-bold mb-1">20+</div>
                        <div className="text-xs font-medium opacity-80 uppercase tracking-wide">Weeks of Innovation</div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
